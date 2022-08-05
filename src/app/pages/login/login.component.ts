import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/user';

export interface ILogin{
   title: string,
   subTitle: string,
   invalidEmail: string,
   requiredPassword: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataLogin: ILogin = {
    title : 'Faça o login',
    subTitle: 'Se você já é um membro, pode fazer o login com seu endereço de e-mail e senha.',
    invalidEmail: 'Por favor, digite um email valido',
    requiredPassword: 'Digite uma senha'
  }
  formUser : FormGroup;

  hideButton = true;
  
  
  constructor( private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.createForm(new User());
  }

  createForm(user: User) {
    this.formUser = this.formBuilder.group({
      email:[user.email, [Validators.required, Validators.email]],
      password: [user.password, Validators.required]
    });
  }
  get formUserControl() {
    return this.formUser.controls;
  }

  get formErrorEmail() {
    return this.formUserControl['email'].errors && this.formUserControl['email'].status;
  }
  get formErrorPassWord() {
    return this.formUserControl['password'].errors;
  }

  onSubmit() {
    this.formUser.reset(new User())
  }
}
