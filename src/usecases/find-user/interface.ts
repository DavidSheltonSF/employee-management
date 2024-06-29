import { FindUserResponse } from "./response";

export interface FindUserInterface {
  all: () => Promise<FindUserResponse>
  byEmail: (email: string) => Promise<FindUserResponse>
}