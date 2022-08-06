import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/service/users.service';
import { IUserRegister, User } from 'src/app/shared/user';

export interface IRegister {
  title: string,
  subTitle: string,
  invalidEmail: string,
  invalidName: string,
  requiredPassword
}
interface IGender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  dataRegister: IRegister = {
    title: 'Cadastre-se',
    subTitle: 'Seja um membro e aproveite nossa comunidade',
    invalidEmail: 'Por favor, digite um email valido',
    invalidName: 'Por favor, digite seu nome',
    requiredPassword: 'Por favor, digite uma senha'
  }
  formRegister: FormGroup;

  hideButton = true;

  selectedValue: string;

  genders: IGender[] = [
    { value: 'M', viewValue: 'Masculino' },
    { value: 'F', viewValue: 'Feminino' },
    { value: 'O', viewValue: 'Outro' },
  ];


  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.createForm(new User());
  }

  onSubmit() {
    const NEW_USER: IUserRegister = {
      fullName: this.formUserControl['name'].value,
      email: this.formUserControl['email'].value,
      gender: this.formUserControl['gender'].value,
      password: this.formUserControl['password'].value,
    }
    this.createNewUser(NEW_USER)
  }

  createForm(user: User) {
    this.formRegister = this.formBuilder.group({
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, Validators.required],
      name: [user.fullName, Validators.required],
      gender: [user.gender, Validators.required]
    });
  }

  createNewUser(user) {
    this.usersService.setUsers(user).subscribe(
      dataUser => this.navigationHome(dataUser)
    );
  }

  navigationHome(user: IUserRegister) {
    this.router.navigate(['/home'], { queryParams: { ...user } })
  }

  get formUserControl(): object {
    return this.formRegister.controls;
  }
  get formError() {
    return this.formUserControl['password'].errors || this.formUserControl['email'].errors || this.formUserControl['name'].errors || this.formUserControl['gender'].errors
  }
  get formErrorEmail() {
    return this.formUserControl['email'].errors && this.formUserControl['email'].status;
  }
  get formErrorName() {
    return this.formUserControl['name'].errors;
  }
  get formErrorPassword() {
    return this.formUserControl['password'].errors;
  }
}
