import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Merchant} from "../../model/merchant";


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MerchantService {


  constructor(private http: HttpClient) { }
  getIdUser(): any{
    // @ts-ignore
    return JSON.parse(localStorage.getItem("user")).id;
  }
  getAllMerchant(): Observable<Merchant[]>{
    return this.http.get<any>(API_URL+ '/api/merchant');
  }
  // updateActiveMerchant(id: number, merchant: Merchant): Observable<Merchant> {
  //   return this.http.put(`${API_URL}/merchants/${id}`, merchant);
  // }
  updateMerchant(id: number, merchant: Merchant): Observable<Merchant>{
    console.log("update")
    return this.http.put<Merchant>(`${API_URL}/api/merchant/${id}`, merchant);
  }
  // findMerchantById(id: number): Observable<Merchant>{
  //   return  this.http.get<any>(`${API_URL}/api/merchant/${id}`);
  // }
}
