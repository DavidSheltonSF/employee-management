import { right, left } from "../../shared/either";
import { UserRepository } from "../_ports/user-repository";
import { DeleteUserInterface as DeleteUser } from "../delete-user.ts/interface";
import { DeleteUserResponse } from "../delete-user.ts/response";
import { mock_user } from "./helper/mock_user";
import { NoResultError } from "../_errors/no-result";

export class DeleteUserSpy implements DeleteUser {
  private readonly userRepository: UserRepository
  deleteParam: Record<string, string> = {};

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async delete(email: string): Promise<DeleteUserResponse> {

    this.deleteParam['email'] = email;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user){
      return left(new NoResultError(email))
    }

    return right(mock_user());
  }
}