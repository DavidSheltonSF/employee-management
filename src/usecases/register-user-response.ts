import { UserData } from "../entities/user/user-data";
import { InvalidBirthdayError, InvalidDepartmentError, InvalidEmailError, InvalidGenderError, InvalidNameError, InvalidPasswordError, InvalidRoleError, InvalidUserRoleError } from "../entities/errors";
import { Either } from "../shared/either";


export type RegisterEmployeeResponse = Either<InvalidNameError | 
InvalidEmailError | InvalidPasswordError | InvalidUserRoleError, UserData>