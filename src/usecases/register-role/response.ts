import { RoleData } from "../../entities/role/role-data";
import { InvalidDepartmentError, InvalidRoleError } from "../../entities/_errors";
import { Either } from "../../shared/either";

export type RegisterRoleResponse = Either<InvalidRoleError | InvalidDepartmentError, RoleData>