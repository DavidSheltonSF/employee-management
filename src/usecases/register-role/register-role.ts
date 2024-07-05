import { InvalidDepartmentError, InvalidRoleError } from "../../entities/_errors";
import { Role } from "../../entities/role/role";
import { RoleData } from "../../entities/role/role-data";
import { Either, left, right } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { RoleRepository } from "../_ports/role-repository"; 
import { RegisterRoleInterface } from "./interface";
import { RegisterRoleResponse } from "./response";

export class RegisterRole implements RegisterRoleInterface {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepo: RoleRepository){
    this.roleRepository = roleRepo;
  }

  async register(roleData: RoleData): Promise<RegisterRoleResponse> {

    const roleOrError: Either<InvalidRoleError | 
    InvalidDepartmentError, Role> = Role.create(roleData);

    if (roleOrError.isLeft()){
      return left(roleOrError.value)
    }

    const role = roleOrError.value;
    const exists = this.roleRepository.exists(role.name.value);
    if ((await exists).valueOf()){
      return left(new DuplicateDataError(role.name.value))
    }

    await this.roleRepository.add(roleData);

    return right(roleData);
  }
}