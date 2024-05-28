import { EmployeeDataWithoutEmail } from "./interface";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { EmployeeRepository } from "../_ports/employee-repository";
import { AlterEmployeeInterface } from "./interface";
import { AlterEmployeeResponse } from "./response";

export class AlterEmployee implements AlterEmployeeInterface {
  private readonly employeeRepository: EmployeeRepository

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async alter(email: string, employeeData: EmployeeDataWithoutEmail): Promise<AlterEmployeeResponse>{

    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }

    await this.employeeRepository.update(email, employeeData);

    return right(employee)

  }
}