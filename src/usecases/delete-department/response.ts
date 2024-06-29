import { DepartmentData } from "../../entities/department/department-data";
import { InvalidEmailError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";

export type DeleteDepartmentResponse = Either<InvalidEmailError | 
NoResultError, DepartmentData>