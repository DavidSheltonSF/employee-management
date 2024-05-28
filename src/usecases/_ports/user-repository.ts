import { UserData } from "../../entities/user/user-data";

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData | null>
  add: (userData: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}