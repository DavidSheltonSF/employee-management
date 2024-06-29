import { InvalidEmailError } from "../../entities/_errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";
import { EmployeeData } from "../../entities/employee/employee-data";

export type FindEmployeeResponse = Either<InvalidEmailError | 
NoResultError, EmployeeData | EmployeeData[]>