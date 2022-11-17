import { Injectable } from '@angular/core';
import {Order} from "../../model/order";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../model/iorder";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  checkout(order: Order): Observable<any>{
    console.log("order api")
    console.log(order)
    return this.http.post<any>(`${API_URL}/api/public/orders`,order);
  }
  getOrder(): Observable<IOrder[]>{
    return this.http.get<any>(`${API_URL}/api/public/orders`);
  }

  updateOrderStatus(order: Order, id: number): Observable<IOrder[]>{
    return this.http.patch<any>(`${API_URL}/api/public/orders/${id}`,order);
  }

  getOrderByUser(id: number): Observable<IOrder[]>{
    return this.http.get<any>(`${API_URL}/api/public/orders/user/${id}`);
  }

  deleteOrder(id: number): Observable<any>{
    return this.http.delete<any>(`${API_URL}/api/public/orders/${id}`);
  }
}
