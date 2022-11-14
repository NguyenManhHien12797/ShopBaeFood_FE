import { Injectable } from '@angular/core';
import {Product} from "../../model/product";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }


  acceptRegistration(mail: any, name: string): Observable<any>{
    // @ts-ignore
    return this.http.post<any>(API_URL+`/api/public/mail/accept?email=${mail}&name=${name}`)
  }

  refuseToRegister(mail: any): Observable<any>{
    // @ts-ignore
    return this.http.post<any>(API_URL+"/api/public/mail/refuse?email=" +mail)
  }


}
