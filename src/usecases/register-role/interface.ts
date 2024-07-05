import { RoleData } from "../../entities/role/role-data";
import { RegisterRoleResponse } from "./response";

export interface RegisterRoleInterface{
  register: (role: RoleData) => Promise<RegisterRoleResponse>
}  