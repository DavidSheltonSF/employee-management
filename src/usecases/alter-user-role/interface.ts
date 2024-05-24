import { AlterUserRoleResponse } from "./response";

export interface AlterUserRoleInterface {
  alterUserRole: (email: string, role: string) => Promise<AlterUserRoleResponse>
}