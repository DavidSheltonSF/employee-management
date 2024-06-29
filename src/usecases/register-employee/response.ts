import { EmployeeData } from "../../entities/employee/employee-data";
import { InvalidBirthdayError, InvalidDepartmentError, InvalidEmailError, InvalidGenderError, InvalidNameError, InvalidRoleError } from "../../entities/_errors";
import { Either } from "../../shared/either";

export type RegisterEmployeeResponse = Either<InvalidNameError | 
InvalidEmailError | InvalidBirthdayError | InvalidGenderError | 
InvalidDepartmentError | InvalidRoleError, EmployeeData>