import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../_ports/user-repository";

export class SpyUserRepository implements UserRepository {
  users: UserData[] = [];
  addParams: Record<string, UserData> = {}
  updateParams: Record<string, string | UserData> = {};
  deleteParams: Record<string, string > = {};

  constructor(users: UserData[]){
    this.users = users;
  }

  async findAllUsers(): Promise<UserData[]>{
    return this.users;
  }

  async findUserByEmail (email: string): Promise<UserData| null> {
    var u: UserData
    for (u of this.users) {
      if (u.email === email) {
        return u
      }
    }
    return null
  }

  async exists (email: string): Promise<boolean> {
    if (await this.findUserByEmail(email) === null){
      return false;
    }

    return true;
  }

  async add (userData: UserData): Promise<void> {

    this.users.push(userData);
    this.addParams['userData'] = userData
   
  }

  async update (email: string, userData: UserData):Promise<void>{
    const user = await this.findUserByEmail(email);

    if (user){
      this.updateParams['email'] = email;
      this.updateParams['userData'] = userData;

    }
  }

  async delete (email: string): Promise<void> {
    const user = await this.findUserByEmail(email);

    if (user){
      this.deleteParams['email'] = email;
    }
  }
}