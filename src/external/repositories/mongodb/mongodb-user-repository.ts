import { UserData } from "../../../entities/user/user-data";
import { UserRepository } from "../../../usecases/_ports/user-repository";
import { mongoHelper } from "./helpers/mongo-helper";


export class MongodbUserRepository implements UserRepository{
  
  async findAllUsers(): Promise<UserData[]>{
    const userCollection = await mongoHelper.getCollection('users')?.find().toArray();

    if (userCollection){
      const result = userCollection.map((elem) => {
        const { name, lastName, email, userRole, password} = elem;  
        return { name, lastName, email, userRole, password}
      });

      return result;
    }

    return [];
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    const userCollection = mongoHelper.getCollection('users');
    const user = await userCollection?.findOne({email});

    if (user){
      const {name, lastName, email, userRole, password} = user
      return {name, lastName, email, userRole, password};
    }
    return null;
  }

  async add(user: UserData): Promise<void>{
    const userCollection = mongoHelper.getCollection('users');
    const exists = await this.exists(user.email);
    if(!exists){
      await userCollection?.insertOne(user);
    }
  }

  async update(email: string, userData: UserData): Promise<void>{

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

    return false;
  }
}