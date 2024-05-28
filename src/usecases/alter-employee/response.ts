import { EmployeeDataWithoutEmail } from "./interface";
import { InvalidEmailError } from "../../entities/errors";
import { NoResultError } from "../_errors/no-result";
import { Either } from "../../shared/either";



export type AlterEmployeeResponse = Either<InvalidEmailError | 
NoResultError, EmployeeDataWithoutEmail>