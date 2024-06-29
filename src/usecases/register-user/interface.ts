import { UserData } from "../../entities/user/user-data";
import { RegisterUserResponse } from "./response";

export interface RegisterUserInterface{
  register: (user: UserData) => Promise<RegisterUserResponse>
}  