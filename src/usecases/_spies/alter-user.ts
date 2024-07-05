import { right, left } from "../../shared/either";
import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../_ports/user-repository";
import { AlterUserInterface as AlterUser } from "../alter-user/interface";
import { AlterUserResponse } from "../alter-user/response";
import { mock_user } from "./helper/mock_user";
import { NoResultError } from "../_errors/no-result";

export class AlterUserSpy implements AlterUser {
  private readonly userRepository: UserRepository
  alterParam: Record<string, string | UserData> = {};

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async alter(email: string, userData: UserData): Promise<AlterUserResponse> {

    this.alterParam['email'] = email;
    this.alterParam['userData'] = userData;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new NoResultError(email))
    }
    return right(mock_user());
  }
}