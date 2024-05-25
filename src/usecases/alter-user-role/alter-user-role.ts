import { left, right } from "../../shared/either";
import { UserNotFoundError } from "../errors/no-result";
import { UserRepository } from "../ports/user-repository";
import { AlterUserRoleInterface } from "./interface";
import { AlterUserRoleResponse } from "./response";

export class PromoteUser implements AlterUserRoleInterface{
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async alterUserRole(email: string, role: String): Promise<AlterUserRoleResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new UserNotFoundError(email));
    }

    //this.userRepository.update

    return right(true);
  }
}