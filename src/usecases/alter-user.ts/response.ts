import { InvalidEmailError } from "../../entities/errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { UserData } from "../../entities/user/user-data";


export type AlterUserResponse = Either<InvalidEmailError | 
NoResultError, UserData>