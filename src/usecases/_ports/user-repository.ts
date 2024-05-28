import { UserData } from "../../entities/user/user-data";
import { UserDataWithoutEmail } from "../alter-user.ts/interface";

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData | null>
  add: (userData: UserData) => Promise<void>
  update: (email: string, userData: UserData | UserDataWithoutEmail) => Promise<void>
  delete: (email: string) => Promise<void>
  exists: (email: string) => Promise<boolean>
}