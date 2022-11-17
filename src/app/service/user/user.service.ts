import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Merchant} from "../../model/merchant";
import {AppUser} from "../../model/appUser";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  getAllUser(): Observable<AppUser[]>{
    return this.http.get<any>(API_URL+ '/api/users');
  }
  // updateActiveMerchant(id: number, merchant: Merchant): Observable<Merchant> {
  //   return this.http.put(`${API_URL}/merchants/${id}`, merchant);
  // }
  updateUser(id: number | undefined, user: AppUser): Observable<AppUser>{
    return this.http.put<AppUser>(`${API_URL}/api/users/${id}`, user);
  }
}
