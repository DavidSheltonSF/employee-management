import { EmployeeData } from "../../entities/employee/employee-data";
import { InvalidEmailError } from "../../entities/errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";



export type DeleteEmployeeResponse = Either<InvalidEmailError | 
NoResultError, EmployeeData>