import { Either } from "../../shared/either";
import { NotAllowedError } from "../errors/not-allowed";
import { UserNotFoundError } from "../errors/user-not-found";

export type AlterUserRoleResponse = Either<NotAllowedError | UserNotFoundError, boolean>