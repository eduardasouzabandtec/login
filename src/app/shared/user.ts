export class User {
    fullName: string = '';
    email: string = '';
    gender: string = '';
    password: string = '';
}
export interface IUserRegister {
    fullName: string,
    email: string,
    gender: string,
    password: string,
}
export interface IUserLogin {
    email: string,
    password: string
}