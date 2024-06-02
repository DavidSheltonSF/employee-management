import { right, left } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../_ports/user-repository";
import { RegisterUserInterface as RegisterUser} from "../register-user/interface";
import { RegisterUserResponse } from "../register-user/response";
import { mock_user } from "./helper/mock_user";
import { User } from "../../entities/user/user";

export class RegisterUserSpy implements RegisterUser {
  private readonly userRepository: UserRepository
  registerParam: Record<string, UserData> = {};

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async register(userData: UserData): Promise<RegisterUserResponse> {

    this.registerParam['userData'] = userData;

    const userOrError = User.create(userData);

    if (userOrError.isLeft()){
      return left(userOrError.value)
    }

    const user = userOrError.value;
    const exists = this.userRepository.exists(user.email.value);
    if ((await exists).valueOf()){
      return left(new DuplicateDataError(user.email.value))
    }

    await this.userRepository.add(userData);

    return right(mock_user());
  }
}