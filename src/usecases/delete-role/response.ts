import { RoleData } from "../../entities/role/role-data";
import { InvalidRoleError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";

export type DeleteRoleResponse = Either<InvalidRoleError | 
NoResultError, RoleData>