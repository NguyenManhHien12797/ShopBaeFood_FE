import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Order} from "../../model/order";
import {Observable} from "rxjs";
import {OrderDetail} from "../../model/order-detail";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }

  addOrderDetail(orderDetail: OrderDetail): Observable<any>{
    console.log("orderDetail api")
    console.log(orderDetail)
    return this.http.post<any>(`${API_URL}/api/public/orderdetails`,orderDetail);
  }

  getOrderDetailByOrder(id: number): Observable<any>{
    return this.http.get<any>(`${API_URL}/api/public/orderdetails/order/${id}`);
  }
}
