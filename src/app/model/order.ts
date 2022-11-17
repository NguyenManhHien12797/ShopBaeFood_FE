import {AppUser} from "./appUser";

export class Order {
  id: number;
  appUser: AppUser;
  note: string;
  status: string;
  "merchant_id":number;
  "totalPrice": number;


  constructor(appUser: AppUser, note: string, status: string, merchant_id:number, totalPrice:number) {
    this.appUser = appUser;
    this.note = note;
    this.status = status;
    this.merchant_id= merchant_id;
    this.totalPrice = totalPrice;
  }
}
