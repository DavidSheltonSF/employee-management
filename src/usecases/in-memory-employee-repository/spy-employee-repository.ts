import { EmployeeData } from "../../entities/employee/employee-data";
import { EmployeeRepository } from "../ports/employee-repository";

export class SpyEmployeeRepository implements EmployeeRepository {
  users: EmployeeData[] = [];
  updateUserParams: Record<string, EmployeeData> = {}

  constructor(users: EmployeeData[]){
    this.users = users;
  }

  async findAllUsers(): Promise<EmployeeData[]>{
    return this.users;
  }

  async findUserByEmail (email: string): Promise<EmployeeData| null> {
    var u: EmployeeData
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

  async add (EmployeeData: EmployeeData): Promise<void> {

    const exists = await this.exists(EmployeeData.email);
    if (!exists){
      this.users.push(EmployeeData);
    } 
  }

  async update (EmployeeData: EmployeeData):Promise<boolean>{
    const {email} = EmployeeData;
    const user = await this.findUserByEmail(email);

    if (!user){
      return false;
    }

    this.updateUserParams['EmployeeData'] = EmployeeData;

    return true;
  }
}