import { DepartmentData } from "../../entities/department/department-data";
import { AlterDepartmentResponse } from "./response";

export interface AlterDepartmentInterface {
  alter: (name: string, departmentData: DepartmentData) => Promise<AlterDepartmentResponse>
}