import { EmployeeData } from "../../entities/employee/employee-data";
import { AlterEmployeeResponse } from "./response";

export type EmployeeDataWithoutEmail = Omit<EmployeeData, "email">

export interface AlterEmployeeInterface {
  alter: (email: string, employeeData: EmployeeDataWithoutEmail) => Promise<AlterEmployeeResponse>
}