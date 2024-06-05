import { DeleteUserResponse } from "./response";

export interface DeleteUserInterface {
  delete: (email: string) => Promise<DeleteUserResponse>
}