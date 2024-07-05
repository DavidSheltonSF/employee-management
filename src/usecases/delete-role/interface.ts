import { DeleteRoleResponse } from "./response";

export interface DeleteRoleInterface {
  delete: (email: string) => Promise<DeleteRoleResponse>
}