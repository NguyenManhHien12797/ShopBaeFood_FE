import {AppUser} from "./appUser";
import {Merchant} from "./merchant";

export interface Account {
  id: number;
  userName: string;
  password: string;
  email: string;
  enabled: boolean;
  user: AppUser;
  merchant: Merchant;
}
