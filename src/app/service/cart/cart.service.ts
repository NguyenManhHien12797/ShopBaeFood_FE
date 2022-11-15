import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Cart} from "../../model/cart";
import {Product} from "../../model/product";
import {CartDTO} from "../../model/cartDTO";


const API_URL= environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCartByUserId(id : number):Observable<any>{
    return this.http.get<any>( `${API_URL}/api/public/cart/user/${id}`);
  }

  addToCart(cart: CartDTO):Observable<CartDTO>{
    return this.http.post<any>( `${API_URL}/api/cart`,cart);
  }

  findCartByProuct(id: number): Observable<any>{
    return this.http.get<any>(`${API_URL}/api/public/cart/product/${id}`);
  }

  findCartByUserId(id: number): Observable<any>{
    return this.http.get<any>(`${API_URL}/api/public/cart/user/${id}`);
  }

  upDateToCart(id: number,cart: Cart):Observable<Cart>{
    return this.http.patch<any>( `${API_URL}/api/cart/${id}`,cart);
  }

  deleteProductCart(id: number): Observable<any>{
    return this.http.delete(`${API_URL}/api/cart/${id}`);
  }

  existsCartByProductId(id: number): Observable<any>{
    return this.http.get<any>(`${API_URL}/public/existsCartByProductId/${id}`);
  }

}
