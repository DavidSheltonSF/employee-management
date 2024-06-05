import { UserData } from "../../entities/user/user-data";
import { AlterUserResponse } from "./response";

export interface AlterUserInterface {
  alter: (userData: UserData) => Promise<AlterUserResponse>
}