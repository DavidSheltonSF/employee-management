import { DepartmentData } from "../../../entities/department/department-data";
import { DepartmentRepository } from "../../../usecases/_ports/department-repository";
import { mongoHelper } from "./helpers/mongo-helper";


export class MongodbDepartmentRepository implements DepartmentRepository{
  
  async findAllDepartments(): Promise<DepartmentData[]>{
    const departmentCollection = await mongoHelper.getCollection('departments')?.find().toArray();

    if (departmentCollection){
      const result = departmentCollection.map((elem) => {
        const { name, managerEmail} = elem;
        return { name, managerEmail }
      });

      return result
    }

    return []
  }

  async findDepartmentByName(name: string): Promise<DepartmentData | null> {
    const departmentCollection = mongoHelper.getCollection('departments');
    const department = await departmentCollection?.findOne({name});

    if (department){
      const {name, managerEmail} = department
      return {name, managerEmail};
    }
    return null
  }

  async add(department: DepartmentData): Promise<void>{
    const departmentCollection = mongoHelper.getCollection('departments');
    const exists = await this.exists(department.name);
    if(!exists){
      await departmentCollection?.insertOne(department);
    }
  }

  async update(name: string, departmentData: DepartmentData): Promise<void>{

    const departmentCollection = mongoHelper.getCollection('departments');
    const exists = await this.exists(name);
    if (exists){
      await departmentCollection?.updateOne({name}, {"$set": {
        name: departmentData.name,
        managerEmail: departmentData.managerEmail
      }});
    }
  }

  async delete(name: string): Promise<void>{
    const departmentCollection = mongoHelper.getCollection('departments');
    const exists = await this.exists(name);

    if (exists){
      await departmentCollection?.deleteOne({name});
    }
  }

  async exists(name: string): Promise<boolean>{
    const result = await this.findDepartmentByName(name);
    if (result != null){
      return true;
    }
    return false
  }
}