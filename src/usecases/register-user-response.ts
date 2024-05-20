import { UserData } from "../entities/user/user-data";
import { InvalidEmailError, InvalidNameError, InvalidPasswordError, InvalidUserRoleError } from "../entities/errors";
import { Either } from "../shared/either";


export type RegisterEmployeeResponse = Either<InvalidNameError | 
InvalidEmailError | InvalidPasswordError | InvalidUserRoleError, UserData>