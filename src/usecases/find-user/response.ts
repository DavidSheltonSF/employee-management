import { InvalidEmailError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { UserData } from "../../entities/user/user-data";

export type FindUserResponse = Either<InvalidEmailError | 
NoResultError, UserData | UserData[]>