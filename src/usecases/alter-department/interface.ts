import { DepartmentData } from "../../entities/department/department-data";
import { AlterDepartmentResponse } from "./response";

export interface AlterDepartmentInterface {
  alter: (departmentData: DepartmentData) => Promise<AlterDepartmentResponse>
}