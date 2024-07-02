import { DepartmentData } from "../../entities/department/department-data";
import { InvalidNameError } from "../../entities/_errors";
import { Either } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { ManagerNotFoundError } from "../_errors/ManagerNotFound";

export type RegisterDepartmentResponse = Either<InvalidNameError | DuplicateDataError | ManagerNotFoundError, DepartmentData>