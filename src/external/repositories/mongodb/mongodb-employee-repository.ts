import { EmployeeData } from "../../../entities/employee/employee-data";
import { EmployeeRepository } from "../../../usecases/_ports/employee-repository";
import { mongoHelper } from "./hepers/mongo-helper";


export class MongodbEmployeeRepository implements EmployeeRepository{
  
  async findAllEmployees(): Promise<EmployeeData[]>{
    const employeeCollection = await mongoHelper.getCollection('employees')?.find().toArray();

    if (employeeCollection){
      const result = employeeCollection.map((elem) => {
        const { name, lastName, email, birthday, gender, role, department} = elem;
         
        return { name, lastName, email, birthday, gender, role, department}
      })

      return result
    }

    return []
  }

  async findEmployeeByEmail(email: string): Promise<EmployeeData | null> {
    const employeeCollection = mongoHelper.getCollection('employees');
    const employee = await employeeCollection?.findOne({email});

    if (employee){
      const  { name, lastName, email, birthday, gender, role, department} = employee
      return  { name, lastName, email, birthday, gender, role, department};
    }
    return null
  }

  async add(employee: EmployeeData): Promise<void>{
    const employeeCollection = mongoHelper.getCollection('employees');
    const exists = await this.exists(employee.email);
    if(!exists){
      await employeeCollection?.insertOne(employee);
    }
  }

  async update(employeeData: EmployeeData): Promise<void>{
    const { email } = employeeData;
    const employeeCollection = mongoHelper.getCollection('employees');
    const exists = await this.exists(email);
    if (exists){
      await employeeCollection?.updateOne({email}, {"$set": {
        name: employeeData.name,
        lastName: employeeData.lastName,
        birthday: employeeData.birthday,
        gender: employeeData.gender,
        role: employeeData.role
      }});
    }
  }

  async delete(email: string): Promise<void>{
    const employeeCollection = mongoHelper.getCollection('employees');
    const exists = await this.exists(email);

    if (exists){
      await employeeCollection?.deleteOne({email});
    }
  }

  async exists(email: string): Promise<boolean>{
    const result = await this.findEmployeeByEmail(email);
    if (result != null){
      return true;
    }

    return false
  }

}