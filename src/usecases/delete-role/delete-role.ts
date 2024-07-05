import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { RoleRepository } from "../_ports/role-repository";
import { DeleteRoleInterface } from "./interface";
import { DeleteRoleResponse } from "./response";

export class DeleteRole implements DeleteRoleInterface {
  private readonly roleRepository: RoleRepository

  constructor(roleRepo: RoleRepository){
    this.roleRepository = roleRepo;
  }

  async delete(name: string): Promise<DeleteRoleResponse>{

    const role = await this.roleRepository.findRoleByName(name);

    if (!role){
      return left(new NoResultError(name))
    }

    await this.roleRepository.delete(name);

    return right(role)
  }
}