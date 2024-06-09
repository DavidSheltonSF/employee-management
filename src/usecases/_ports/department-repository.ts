import { DepartmentData } from "../../entities/department/department-data";

export interface DepartmentRepository {
  findAllDepartments: () => Promise<DepartmentData[]>
  findDepartmentByManagerEmail: (email: string) => Promise<DepartmentData | null>
  add: (departmentData: DepartmentData) => Promise<void>
  update: (departmentData: DepartmentData | DepartmentData) => Promise<void>
  delete: (email: string) => Promise<void>
  exists: (email: string) => Promise<boolean>
}