import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Role} from "../../model/role";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtResponse} from "../../model/jwt-response";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppUser} from "../../model/appUser";
import {LoginForm} from "../../model/login-form";
import {ChangepassDTO} from "../../model/changepass-dto";
import {Account} from "../../model/account";
const API_URL= environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  role: Role[] = [
    {
      id: 1,
      name: "ROLE_ADMIN"
    },
    {
      id: 2,
      name: "ROLE_USER"
    }
  ]

  constructor(private http: HttpClient) {

  }

  login(loginForm: LoginForm): Observable<any> {
    return this.http.post<LoginForm>(`${API_URL}/api/public/login`, loginForm);
  }

  register(user : AppUser): Observable<AppUser>{
    return this.http.post<AppUser>(`${API_URL}/api/public/register`,user);
  }

  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  // getUserById(): Observable<AppUser> {
  //   return this.http.get<AppUser>(`${API_URL}/user/${user_id}`);
  // }

  editUserById(id: number, appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${API_URL}/user/${id}`,appUser)
  }

  changePassword(id: number,changePass : ChangepassDTO): Observable<AppUser> {
    return this.http.post<AppUser>(`${API_URL}/user/${id}`,changePass)
  }

  getAccountToMerchant(id: number):Observable<any>{
    return this.http.get<any>(`${API_URL}/api/account/merchant/${id}`);
  }

  getAccountToId(id: number):Observable<any>{
    return this.http.get<any>(`${API_URL}/api/account/${id}`);
  }

  updateAccountMerchant(id: number, acc: Account):Observable<any>{
    return this.http.patch<any>(`${API_URL}/api/account/merchant/${id}`, acc);
  }


}
