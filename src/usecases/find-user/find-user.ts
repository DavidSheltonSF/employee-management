import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { UserRepository } from "../_ports/user-repository";
import { FindUserInterface } from "./interface";
import { FindUserResponse } from "./response";

export class FindUser implements FindUserInterface {
  private readonly userRepository: UserRepository

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async all(): Promise<FindUserResponse>{

    const result = await this.userRepository.findAllUsers();

    return right(result);

  }

  async byEmail(email: string): Promise<FindUserResponse>{

    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new NoResultError(email))
    }

    return right(user);
  }
}