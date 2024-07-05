import { RoleData } from "../../entities/role/role-data";
import { AlterRoleResponse } from "./response";

export interface AlterRoleInterface {
  alter: (roleData: RoleData) => Promise<AlterRoleResponse>
}