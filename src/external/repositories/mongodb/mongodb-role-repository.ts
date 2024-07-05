import { RoleData } from "../../../entities/role/role-data";
import { RoleRepository } from "../../../usecases/_ports/role-repository";
import { mongoHelper } from "./helpers/mongo-helper";


export class MongodbRoleRepository implements RoleRepository{
  
  async findAllRoles(): Promise<RoleData[]>{
    const roleCollection = await mongoHelper.getCollection('roles')?.find().toArray();

    if (roleCollection){
      const result = roleCollection.map((elem) => {
        const { name, department} = elem;  
        return { name, department}
      });

      return result;
    }

    return [];
  }

  async findRoleByName(name: string): Promise<RoleData | null> {
    const roleCollection = mongoHelper.getCollection('roles');
    const role = await roleCollection?.findOne({name});

    if (role){
      const {name, department} = role
      return {name, department};
    }
    return null;
  }

  async add(roleData: RoleData): Promise<void>{
    const roleCollection = mongoHelper.getCollection('roles');
    const exists = await this.exists(roleData.name);
    if(!exists){
      await roleCollection?.insertOne(roleData);
    }
  }

  async update(name: string, roleData: RoleData): Promise<void>{

    const roleCollection = mongoHelper.getCollection('roles');
    const exists = await this.exists(name);
    if (exists){
      await roleCollection?.updateOne({name}, {"$set": {
        name: roleData.name,
        department: roleData.department,
      }});
    }
  }

  async delete(name: string): Promise<void>{
    const roleCollection = mongoHelper.getCollection('roles');
    const exists = await this.exists(name);

    if (exists){
      await roleCollection?.deleteOne({name});
    }
  }

  async exists(name: string): Promise<boolean>{
    const result = await this.findRoleByName(name);
    if (result != null){
      return true;
    }

    return false;
  }
}