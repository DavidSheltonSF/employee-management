import { EmployeeData } from "../../entities/employee/employee-data";
import { RegisterEmployeeResponse } from "./response";

export interface RegisterEmployeeInterface {
  register: (employeeData: EmployeeData) => Promise<RegisterEmployeeResponse>
}