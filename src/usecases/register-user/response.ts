import { UserData } from "../../entities/user/user-data";
import { InvalidEmailError, InvalidNameError, InvalidPasswordError, InvalidUserRoleError } from "../../entities/_errors";
import { Either } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";

export type RegisterUserResponse = Either<InvalidNameError | 
InvalidEmailError | InvalidPasswordError | InvalidUserRoleError | DuplicateDataError, UserData>