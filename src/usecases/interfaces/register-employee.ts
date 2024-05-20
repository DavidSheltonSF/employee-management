import { EmployeeData } from "../../entities/employee/employee-data";
import { RegisterEmployeeResponse } from "../register-employee-response";

export interface RegisterEmployee {
  register: (employeeData: EmployeeData) => Promise<RegisterEmployeeResponse>
}