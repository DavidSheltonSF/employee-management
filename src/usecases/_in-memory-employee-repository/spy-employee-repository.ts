import { EmployeeData } from "../../entities/employee/employee-data";
import { EmployeeRepository } from "../_ports/employee-repository";

export class SpyEmployeeRepository implements EmployeeRepository {
  Employees: EmployeeData[] = [];
  addParams: Record<string, EmployeeData> = {}
  updateParams: Record<string, EmployeeData> = {}

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

  async add (employeeData: EmployeeData): Promise<void> {

    const exists = await this.exists(employeeData.email);
    if (!exists){
      this.Employees.push(employeeData);
    }
    this.addParams['EmployeeData'] = employeeData;

  }

  async update (employeeData: EmployeeData):Promise<void>{
    const {email} = employeeData;
    const Employee = await this.findEmployeeByEmail(email);

    if (Employee){
      this.updateParams['EmployeeData'] = employeeData;
    }

  }
}