import { UserData } from "../../../entities/user/user-data";
import { UserRepository } from "../../../usecases/_ports/user-repository";
import { UserDataWithoutEmail } from "../../../usecases/alter-user.ts/interface";
import { mongoHelper } from "./hepers/mongo-helper";


export class MongodbUserRepository{
  
  async findAllUsers(): Promise<any | null>{
    const result = await mongoHelper.getCollection('users')?.find().toArray();

    if (result){
      return result
    }

    return null

  }

  async findUserByEmail(email: string): Promise<any | null> {
    const userCollection = mongoHelper.getCollection('users');
    const result = await userCollection?.findOne({email});
    return result;
  }

  async add(user: UserData): Promise<void>{
    const userCollection = mongoHelper.getCollection('users');
    const exists = await this.exists(user.email);
    if(!exists){
      await userCollection?.insertOne(user);
    }
  }

  async update(email: string, userData: UserDataWithoutEmail): Promise<void>{
    const userCollection = mongoHelper.getCollection('users');
    const exists = await this.exists(email);
    if (exists){
      await userCollection?.updateOne({email}, {"$set": {
        name: userData.name,
        lastName: userData.lastName,
        password: userData.password,
        userRole: userData.userRole
      }});
    }
      
  }

  async delete(email: string): Promise<void>{
    const userCollection = mongoHelper.getCollection('users');
    const exists = await this.exists(email);

    if (exists){
      await userCollection?.deleteOne({email});
    }
  }

  async exists(email: string): Promise<boolean>{
    const result = await this.findUserByEmail(email);
    if (result != null){
      return true;
    }

    return false
  }

}