import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { UserRepository } from "../_ports/user-repository";
import { AlterUserInterface } from "./interface";
import { AlterUserResponse } from "./response";

export class AlterUser implements AlterUserInterface {
  private readonly userRepository: UserRepository

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async alter(email: string, userData: UserData): Promise<AlterUserResponse>{

    const user = await this.userRepository.findUserByEmail(email);
    if (!user){
      return left(new NoResultError(email))
    }

    await this.userRepository.update(email, userData);

    return right(user)

  }
}