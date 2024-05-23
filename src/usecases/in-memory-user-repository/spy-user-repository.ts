import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../ports/user-repository";

export class SpyUserRepository implements UserRepository {
  users: UserData[] = [];

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

    const exists = this.exists(userData.email);
    if (!exists){
      this.users.push(userData);
    }
    
  }
}