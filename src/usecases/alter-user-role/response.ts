import { Either } from "../../shared/either";
import { NotAllowedError } from "../errors/not-allowed";
import { NoResultError } from "../errors/no-result";

export type AlterUserRoleResponse = Either<NotAllowedError | NoResultError, boolean>