import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Role} from "../../model/role";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtResponse} from "../../model/jwt-response";
import {HttpClient} from "@angular/common/http";
import {AppUser} from "../../model/appUser";
import {LoginForm} from "../../model/login-form";
import {ChangepassDTO} from "../../model/changepass-dto";
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

  public currentUser: Observable<JwtResponse>;
  public currentUserSubject: BehaviorSubject<AppUser>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }

  login(loginForm: LoginForm): Observable<JwtResponse> {
    return this.http.post<LoginForm>(`${API_URL}/api/public/login`, loginForm);
  }

  register(user : AppUser): Observable<AppUser>{
    return this.http.post<AppUser>(`${API_URL}/register`,user);
  }

  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  getUserById(): Observable<AppUser> {
    let user_id = this.currentUserValue.id;
    return this.http.get<AppUser>(`${API_URL}/user/${user_id}`);
  }

  editUserById(id: number, appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${API_URL}/user/${id}`,appUser)
  }

  changePassword(id: number,changePass : ChangepassDTO): Observable<AppUser> {
    return this.http.post<AppUser>(`${API_URL}/user/${id}`,changePass)
  }
}
