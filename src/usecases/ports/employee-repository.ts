import { EmployeeData } from "../../entities/employee/employee-data"

export interface EmployeeRepository {
  findAllEmployees: () => Promise<EmployeeData[]>
  findEmployeeByEmail: (email: string) => Promise<EmployeeData>
  add: (userData: EmployeeData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}