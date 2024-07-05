import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { RoleRepository } from "../_ports/role-repository";
import { FindRoleInterface } from "./interface";
import { FindRoleResponse } from "./response";

export class FindRole implements FindRoleInterface {
  private readonly roleRepository: RoleRepository

  constructor(roleRepo: RoleRepository){
    this.roleRepository = roleRepo;
  }

  async all(): Promise<FindRoleResponse>{
    const result = await this.roleRepository.findAllRoles();
    return right(result);
  }

  async byName(name: string): Promise<FindRoleResponse>{

    const role = await this.roleRepository.findRoleByName(name);

    if (!role){
      return left(new NoResultError(name))
    }

    return right(role);
  }
}