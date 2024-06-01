import { EmployeeData } from "../../entities/employee/employee-data";
import { AlterEmployeeResponse } from "./response";

export interface AlterEmployeeInterface {
  alter: (employeeData: EmployeeData) => Promise<AlterEmployeeResponse>
}