import {Roles} from './roles';

export class User {
 id! : number;
 name! :string;
 username! :string;
  email! :string;
  password:string;
 avatar! :string;
  phone! : string;
 address! :string;
  nameStore! :string;
  rateNNumber! :number;
  roles:Roles[]


  constructor(id: number, name: string, username: string, email: string, avatar: string, phone: string, address: string, nameStore: string, rateNNumber: number, roles: Roles[]) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;

    this.avatar = avatar;
    this.phone = phone;
    this.address = address;
    this.nameStore = nameStore;
    this.rateNNumber = rateNNumber;
    this.roles = roles;
  }
}
