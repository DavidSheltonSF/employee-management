import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { EmployeeRepository } from "../_ports/employee-repository";
import { AlterEmployeeInterface } from "./interface";
import { AlterEmployeeResponse } from "./response";
import { RegisterEmployee } from "../register-employee/register-employee";
import { EmployeeData } from "../../entities/employee/employee-data";

export class AlterEmployee implements AlterEmployeeInterface {
  private readonly employeeRepository: EmployeeRepository

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async alter(employeeData: EmployeeData): Promise<AlterEmployeeResponse>{
    const { email } = employeeData
    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }

    await this.employeeRepository.update(employeeData);

    return right(employee)

  }
}