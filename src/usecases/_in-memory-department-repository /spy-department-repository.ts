import { DepartmentData } from "../../entities/department/department-data";
import { DepartmentRepository } from "../_ports/department-repository";

export class SpyDepartmentRepository implements DepartmentRepository {
  departments: DepartmentData[] = [];
  addParams: Record<string, DepartmentData> = {}
  updateParams: Record<string, DepartmentData> = {};
  deleteParams: Record<string, string > = {};

  constructor(departments: DepartmentData[]){
    this.departments = departments;
  }

  async findAllDepartments(): Promise<DepartmentData[]>{
    return this.departments;
  }

  async findDepartmentByName(name: string): Promise<DepartmentData | null> {
    let department: DepartmentData
    for (department of this.departments) {
      if (department.name === name) {
        return department
      }
    }
    return null
  }

  async exists(name: string): Promise<boolean> {
    if (await this.findDepartmentByName(name) === null){
      return false;
    }
    return true;
  }

  async add(departmentData: DepartmentData): Promise<void> {
    this.departments.push(departmentData);
    this.addParams['departmentData'] = departmentData
  }

  async update(name: string, departmentData: DepartmentData):Promise<void>{
    this.updateParams['name'] = departmentData;
    this.updateParams['departmentData'] = departmentData;
  }

  async delete(name: string): Promise<void> {
    this.deleteParams['name'] = name;
  }
}