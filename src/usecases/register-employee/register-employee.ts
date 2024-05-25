import { Employee } from "../../entities/employee/employee";
import { EmployeeData } from "../../entities/employee/employee-data";
import { left, right } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { EmployeeRepository } from "../_ports/employee-repository";
import { RegisterEmployeeInterface } from "./interface";
import { RegisterEmployeeResponse } from "./response";

export class RegisterEmployee implements RegisterEmployeeInterface {
  private readonly employeeRepository: EmployeeRepository

  constructor(userRepo: EmployeeRepository){
    this.employeeRepository = userRepo;
  }

  async register(employeeData: EmployeeData): Promise<RegisterEmployeeResponse>{

    const employeeOrError = Employee.create(employeeData);

    if(employeeOrError.isLeft()){
      return left(employeeOrError.value)
    }

    const employee = employeeOrError.value;
    const exists = this.employeeRepository.exists(employee.email.value);

    if ((await exists).valueOf()){
      return left(new DuplicateDataError(employee.email.value));
    }

    await this.employeeRepository.add(employeeData)

    return right(employeeData)

  }
}