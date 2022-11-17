import {AppUser} from "./appUser";

export interface IOrder {
  id: number;
  appUser: AppUser;
  note: string;
  status: string;
  "merchant_id":number;
  "orderdate": string;
  "totalPrice": number;
}
