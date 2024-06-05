import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { UserRepository } from "../_ports/user-repository";
import { DeleteUserInterface } from "./interface";
import { DeleteUserResponse } from "./response";

export class DeleteUser implements DeleteUserInterface {
  private readonly userRepository: UserRepository

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async delete(email: string): Promise<DeleteUserResponse>{

    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new NoResultError(email))
    }

    await this.userRepository.delete(email);

    return right(user)

  }
}