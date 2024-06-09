import { DepartmentData } from "../../entities/department/department-data";
import { RegisterDepartmentResponse } from "./response";

export interface RegisterDepartmentInterface
 {
  register: (department: DepartmentData) => Promise<RegisterDepartmentResponse>
}  