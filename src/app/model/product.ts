import {Merchant} from "./merchant";

export interface Product {
  id: number;
  name: string;
  shortDescription:string;
  numberOrder:string;
  oldPrice: number;
  newPrice: number;
  image: string;
  merchant: Merchant;
  deleteFlag: boolean;
}
