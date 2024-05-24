import { UserData } from "../../entities/user/user-data";
import { InvalidEmailError, InvalidNameError, InvalidPasswordError, InvalidUserRoleError } from "../../entities/errors";
import { Either } from "../../shared/either";
import { UserExistsError } from "../errors/user-exists";


export type RegisterUserResponse = Either<InvalidNameError | 
InvalidEmailError | InvalidPasswordError | InvalidUserRoleError | UserExistsError, UserData>