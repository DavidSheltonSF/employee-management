import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { UserRepository } from "../_ports/user-repository";
import { AlterUserRoleInterface } from "./interface";
import { AlterUserRoleResponse } from "./response";

export class AlterUserRole implements AlterUserRoleInterface{
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async alterUserRole(email: string, role: string): Promise<AlterUserRoleResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new NoResultError(email));
    }

    user.userRole = role;

    await this.userRepository.update(email, user);

    return right(true);
  }
}