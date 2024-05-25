import { EmployeeData } from "../../entities/employee/employee-data"

export interface EmployeeRepository {
  findAllEmployees: () => Promise<EmployeeData[]>
  findEmployeeByEmail: (email: string) => Promise<EmployeeData>
  add: (employeeData: EmployeeData) => Promise<void>
  update: (employeeData: EmployeeData) => Promise<void>
  dellete: (employeeData: EmployeeData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}