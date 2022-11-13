import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


const API_URL= environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCartByUserId(id : number):Observable<any>{
    return this.http.get<any>( `${API_URL}/api/public/cart/user/${id}`)
  }
}
