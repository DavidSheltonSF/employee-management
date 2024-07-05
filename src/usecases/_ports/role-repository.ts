import { RoleData } from "../../entities/role/role-data";

export interface RoleRepository {
  findAllRoles: () => Promise<RoleData[]>
  findRoleByName: (name: string) => Promise<RoleData | null>
  add: (roleData: RoleData) => Promise<void>
  update: (roleData: RoleData) => Promise<void>
  delete: (name: string) => Promise<void>
  exists: (name: string) => Promise<boolean>
}