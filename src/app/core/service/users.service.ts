import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLogin, IUserRegister } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BASE_URL = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  getUsers(user: IUserLogin): Observable<IUserRegister[]> {
    const URL = `${this.BASE_URL}?email=${user.email}&password=${user.password}`;
    return this.http.get<IUserRegister[]>(URL)
  }

  setUsers(user: IUserRegister): Observable<any> {
    const HEADERS = { 'content-type': 'application/json' };
    const BODY = JSON.stringify(user);
    return this.http.post(this.BASE_URL, BODY, { 'headers': HEADERS })
  }
}
