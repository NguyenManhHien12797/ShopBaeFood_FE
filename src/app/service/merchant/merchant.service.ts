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

  getAllMerchant(): Observable<Merchant[]>{
    return this.http.get<any>(API_URL+ '/api/merchant');
  }

}
