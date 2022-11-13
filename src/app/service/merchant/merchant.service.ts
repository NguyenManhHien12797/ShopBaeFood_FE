import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Merchant} from "../../model/merchant";


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'No-Auth':'true',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Origin-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  }


  getIdUser(): any{
    // @ts-ignore
    return JSON.parse(localStorage.getItem("data")).merchant.id;
  }
  getAllMerchant(): Observable<Merchant[]>{
    // let token = 'Bearer '+ JSON.parse(localStorage.getItem("token")!);
    // console.log("vao merchant")
    // console.log(token)
    // const headers = new HttpHeaders().set("Authorization",token);
    // console.log(headers)
    return this.http.get<any>(API_URL+ '/api/public/merchant');
  }
  // updateActiveMerchant(id: number, merchant: Merchant): Observable<Merchant> {
  //   return this.http.put(`${API_URL}/merchants/${id}`, merchant);
  // }
  updateMerchant(id: number, merchant: Merchant): Observable<Merchant>{
    return this.http.put<Merchant>(`${API_URL}/api/merchant/${id}`, merchant);
  }
  findMerchantById(id: number): Observable<Merchant>{
    return  this.http.get<Merchant>(`${API_URL}/api/public/merchant/${id}`);
  }
}
