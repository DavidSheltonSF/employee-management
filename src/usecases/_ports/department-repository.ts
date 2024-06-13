import { DepartmentData } from "../../entities/department/department-data";

export interface DepartmentRepository {
  findAllDepartments: () => Promise<DepartmentData[]>
  findDepartmentByName: (name: string) => Promise<DepartmentData | null>
  add: (departmentData: DepartmentData) => Promise<void>
  update: (departmentData: DepartmentData | DepartmentData) => Promise<void>
  delete: (email: string) => Promise<void>
  exists: (name: string) => Promise<boolean>
}