import { DeleteEmployeeResponse } from "./response";

export interface DeleteEmployeeInterface {
  delete: (email: string) => Promise<DeleteEmployeeResponse>
}