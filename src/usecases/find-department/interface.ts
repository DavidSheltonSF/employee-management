import { FindDepartmentResponse } from "./response";

export interface FindDepartmentInterface {
  all: () => Promise<FindDepartmentResponse>
  byName: (name: string) => Promise<FindDepartmentResponse>
}