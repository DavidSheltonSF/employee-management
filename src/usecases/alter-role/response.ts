import { InvalidEmailError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { RoleData } from "../../entities/role/role-data";

export type AlterRoleResponse = Either<InvalidEmailError | 
NoResultError, RoleData>