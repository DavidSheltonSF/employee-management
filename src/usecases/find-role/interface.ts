import { FindRoleResponse } from "./response";

export interface FindRoleInterface {
  all: () => Promise<FindRoleResponse>
  byName: (name: string) => Promise<FindRoleResponse>
}