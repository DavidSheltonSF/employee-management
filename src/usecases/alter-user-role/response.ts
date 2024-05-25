import { Either } from "../../shared/either";
import { NotAllowedError } from "../_errors/not-allowed";
import { NoResultError } from "../_errors/no-result";

export type AlterUserRoleResponse = Either<NotAllowedError | NoResultError, boolean>