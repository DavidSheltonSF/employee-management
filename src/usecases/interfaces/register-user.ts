import { UserData } from "../../entities/user/user-data";
import { RegisterUserResponse } from "../register-user-response";

export interface RegisterUser {
  register: (user: UserData) => Promise<RegisterUserResponse>
}  