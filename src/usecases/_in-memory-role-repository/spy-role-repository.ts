import { RoleData } from "../../entities/role/role-data";
import { RoleRepository } from "../_ports/role-repository";

export class SpyRoleRepository implements RoleRepository {
  roles: RoleData[] = [];
  addParams: Record<string, RoleData> = {}
  updateParams: Record<string, RoleData> = {};
  deleteParams: Record<string, string > = {};

  constructor(roles: RoleData[]){
    this.roles = roles;
  }

  async findAllRoles(): Promise<RoleData[]>{
    return this.roles;
  }

  async findRoleByName (name: string): Promise<RoleData| null> {
    var role: RoleData
    for (role of this.roles) {
      if (role.name === name) {
        return role
      }
    }
    return null
  }

  async exists (name: string): Promise<boolean> {
    if (await this.findRoleByName(name) === null){
      return false;
    }
    return true;
  }

  async add (roleData: RoleData): Promise<void> {
    this.roles.push(roleData);
    this.addParams['roleData'] = roleData
  }

  async update (roleData: RoleData): Promise<void>{
    this.updateParams['roleData'] = roleData;
  }

  async delete (name: string): Promise<void> {
    this.deleteParams['name'] = name;
  }
}