import {Product} from "./product";

export interface Merchant {
  id: number;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  imageBanner: string;
  openTime: string;
  closeTime: string;
  status: string;
  productList: Product[]
}
