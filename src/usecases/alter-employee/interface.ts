import { EmployeeData } from "../../entities/employee/employee-data";
import { AlterEmployeeResponse } from "./response";

export interface AlterEmployeeInterface {
  alter: (email: string, employeeData: EmployeeData) => Promise<AlterEmployeeResponse>
}