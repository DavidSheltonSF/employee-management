import { RoleData } from "../../entities/role/role-data";
import { AlterRoleResponse } from "./response";

export interface AlterRoleInterface {
  alter: (name: string, roleData: RoleData) => Promise<AlterRoleResponse>
}