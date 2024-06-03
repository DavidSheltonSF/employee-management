import { UserData } from "../../entities/user/user-data";
import { FindUserResponse } from "./response";

export interface FindUserInterface {
  all: () => Promise<FindUserResponse>
  byEmail: (email: string) => Promise<FindUserResponse>
}