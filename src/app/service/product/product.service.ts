import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Merchant} from "../../model/merchant";
import {Product} from "../../model/product";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]>{
    return this.http.get<any>(API_URL+ '/api/public/products');
  }
  getAllProductByMerchant(id: number): Observable<Product[]>{
    return this.http.get<any>(API_URL+ `/api/public/products/merchant/${id}`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(API_URL+"/api/products/", product)
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(API_URL+`/api/public/products/${id}`)
  }

  updateProduct(id: number | undefined, product: Product): Observable<Product>{
    return this.http.put<Product>(API_URL+`/api/products/${id}`,product)
  }

  deleteProduct(id:number):Observable<Product>{
    // @ts-ignore
    return this.http.patch<Product>(API_URL+`/api/products/${id}`)
  }
  searchProduct(id:number, name: string):Observable<Product[]>{
    // @ts-ignore
    return this.http.get<any>(API_URL+`/api/public/products/search/${id}?name=`+name)
  }
}
