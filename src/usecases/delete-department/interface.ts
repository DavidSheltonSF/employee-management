import { DeleteDepartmentResponse } from "./response";

export interface DeleteDepartmentInterface {
  delete: (name: string) => Promise<DeleteDepartmentResponse>
}