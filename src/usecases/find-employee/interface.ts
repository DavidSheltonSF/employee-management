import { EmployeeData } from "../../entities/employee/employee-data";
import { FindEmployeeResponse } from "./response";

export interface FindEmployeeInterface {
  all: () => Promise<FindEmployeeResponse>
  byEmail: (email: string) => Promise<FindEmployeeResponse>
}