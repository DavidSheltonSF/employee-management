import { EmployeeData } from "../../entities/employee/employee-data";
import { EmployeeRepository } from "../ports/employee-repository";

export class SpyEmployeeRepository implements EmployeeRepository {
  Employees: EmployeeData[] = [];
  updateEmployeeParams: Record<string, EmployeeData> = {}

  constructor(Employees: EmployeeData[]){
    this.Employees = Employees;
  }

  async findAllEmployees(): Promise<EmployeeData[]>{
    return this.Employees;
  }

  async findEmployeeByEmail (email: string): Promise<EmployeeData| null> {
    var u: EmployeeData
    for (u of this.Employees) {
      if (u.email === email) {
        return u
      }
    }
    return null
  }

  async exists (email: string): Promise<boolean> {
    if (await this.findEmployeeByEmail(email) === null){
      return false;
    }

    return true;
  }

  async add (EmployeeData: EmployeeData): Promise<void> {

    const exists = await this.exists(EmployeeData.email);
    if (!exists){
      this.Employees.push(EmployeeData);
    } 
  }

  async update (employeeData: EmployeeData):Promise<boolean>{
    const {email} = employeeData;
    const Employee = await this.findEmployeeByEmail(email);

    if (!Employee){
      return false;
    }

    this.updateEmployeeParams['EmployeeData'] = employeeData;

    return true;
  }
}