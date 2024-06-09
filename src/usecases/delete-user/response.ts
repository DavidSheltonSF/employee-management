import { UserData } from "../../entities/user/user-data";
import { InvalidEmailError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";



export type DeleteUserResponse = Either<InvalidEmailError | 
NoResultError, UserData>