import { DepartmentData } from "../../entities/department/department-data";
import { DepartmentRepository } from "../_ports/department-repository";

export class SpyDepartmentRepository implements DepartmentRepository {
  departments: DepartmentData[] = [];
  addParams: Record<string, DepartmentData> = {}
  updateParams: Record<string, string | DepartmentData | DepartmentData> = {};
  deleteParams: Record<string, string > = {};

  constructor(departments: DepartmentData[]){
    this.departments = departments;
  }

  async findAllDepartments(): Promise<DepartmentData[]>{
    return this.departments;
  }

  async findDepartmentByManagerEmail (managerEmail: string): Promise<DepartmentData| null> {
    var u: DepartmentData
    for (u of this.departments) {
      if (u.managerEmail === managerEmail) {
        return u
      }
    }
    return null
  }

  async exists (managerEmail: string): Promise<boolean> {
    if (await this.findDepartmentByManagerEmail(managerEmail) === null){
      return false;
    }

    return true;
  }

  async add (departmentData: DepartmentData): Promise<void> {

    this.departments.push(departmentData);
    this.addParams['departmentData'] = departmentData
   
  }

  async update (departmentData: DepartmentData | DepartmentData):Promise<void>{

    this.updateParams['departmentData'] = departmentData;
  }

  async delete (managerEmail: string): Promise<void> {
    
    this.deleteParams['managerEmail'] = managerEmail;
  }
}