import { InvalidDepartmentError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { RoleData } from "../../entities/role/role-data";

export type FindRoleResponse = Either<InvalidDepartmentError | 
NoResultError, RoleData | RoleData[]>