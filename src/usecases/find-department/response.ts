import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { DepartmentData } from "../../entities/department/department-data";

export type FindDepartmentResponse = Either<NoResultError, DepartmentData | DepartmentData[]>