import { InvalidEmailError, InvalidNameError, InvalidPasswordError, InvalidUserRoleError } from "../../entities/errors";
import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { Either, left, right } from "../../shared/either";
import { DuplicateDataError } from "../errors/duplicate-data";
import { UserRepository } from "../ports/user-repository";
import { RegisterUserInterface } from "./interface";
import { RegisterUserResponse } from "./response";

export class RegisterUser implements RegisterUserInterface {
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async register(userData: UserData): Promise<RegisterUserResponse> {

    const userOrError: Either<InvalidNameError | 
    InvalidEmailError | InvalidPasswordError | 
    InvalidUserRoleError, User> = User.create(userData);

    if (userOrError.isLeft()){
      return left(userOrError.value)
    }

    const user = userOrError.value;
    const exists = this.userRepository.exists(user.email.value);
    if ((await exists).valueOf()){
      return left(new DuplicateDataError(user.email.value))
    }

    await this.userRepository.add(userData);

    return right(userData);

  }
}