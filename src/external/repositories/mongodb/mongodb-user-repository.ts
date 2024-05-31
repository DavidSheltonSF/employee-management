import { UserData } from "../../../entities/user/user-data";
import { UserRepository } from "../../../usecases/_ports/user-repository";
import { mongoHelper } from "./hepers/mongo-helper";


export class MongodbUserRepository{
  
  async findAllUsers(): Promise<any | null>{
    const result = mongoHelper.getCollection('users')?.find().toArray();

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
    console.log(userCollection)
    const exists = await this.exists(user.email);
    console.log(exists)
    if(!exists){
      await userCollection?.insertOne(user);
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