import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/service/users.service';
import { IUserLogin, IUserRegister, User } from 'src/app/shared/user';

export interface ILogin {
  title: string,
  subTitle: string,
  invalidEmail: string,
  requiredPassword: string,
  invalidUser: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataLogin: ILogin = {
    title: 'Faça o login',
    subTitle: 'Se você já é um membro, pode fazer o login com seu endereço de e-mail e senha.',
    invalidEmail: 'Por favor, digite um email valido',
    requiredPassword: 'Digite uma senha',
    invalidUser: 'Email ou senha incorretos, verifique os seus dados ou cadastre-se'
  }
  formUser: FormGroup;

  hideButton = true;
  showErrorInvalid = false;


  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.createForm(new User());
  }

  createForm(user: User): void {
    this.formUser = this.formBuilder.group({
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, Validators.required]
    });
  }

  onSubmit() {
    const DATA_LOGIN: IUserLogin = {
      email: this.formUserControl['email'].value,
      password: this.formUserControl['password'].value
    }
    this.userService.getUsers(DATA_LOGIN).subscribe(
      (user: IUserRegister[]) => user.length ? this.navigationToHome(user[0]) : this.showError()
    );
  }

  navigationToHome(user: IUserRegister) {
    this.router.navigate(['/home'], { queryParams: { ...user } })
  }

  showError() {
    this.showErrorInvalid = true;
    this.formUser.reset();
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

}
