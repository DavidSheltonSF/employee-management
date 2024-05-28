import { UserData } from "../../entities/user/user-data";
import { AlterUserResponse } from "./response";

export type UserDataWithoutEmail = Omit<UserData, "email">

export interface AlterUserInterface {
  alter: (email: string, userData: UserDataWithoutEmail) => Promise<AlterUserResponse>
}