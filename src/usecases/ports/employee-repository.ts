import { EmployeeData } from "../../entities/employee/employee-data"

export interface EmployeeRepository {
  findAllEmployees: () => Promise<EmployeeData[]>
  findEmployeeByEmail: (email: string) => Promise<EmployeeData | null>
  add: (employeeData: EmployeeData) => Promise<void>
  update: (employeeData: EmployeeData) => Promise<boolean>
  exists: (email: string) => Promise<boolean>
}