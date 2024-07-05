import { RoleData } from "../../entities/role/role-data";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { RoleRepository } from "../_ports/role-repository";
import { AlterRoleInterface } from "./interface";
import { AlterRoleResponse } from "./response";

export class AlterRole implements AlterRoleInterface {
  private readonly roleRepository: RoleRepository

  constructor(roleRepo: RoleRepository){
    this.roleRepository = roleRepo;
  }

  async alter(roleData: RoleData): Promise<AlterRoleResponse>{
    const { name } = roleData;
    const role = await this.roleRepository.findRoleByName(name);
    if (!role){
      return left(new NoResultError(name))
    }

    await this.roleRepository.update(roleData);

    return right(role)
  }
}