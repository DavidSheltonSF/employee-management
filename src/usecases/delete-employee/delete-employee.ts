import { Employee } from "../../entities/employee/employee";
import { EmployeeData } from "../../entities/employee/employee-data";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { EmployeeRepository } from "../_ports/employee-repository";
import { DeleteEmployeeInterface } from "./interface";
import { DeleteEmployeeResponse } from "./response";

export class DeleteEmployee implements DeleteEmployeeInterface {
  private readonly employeeRepository: EmployeeRepository

  constructor(userRepo: EmployeeRepository){
    this.employeeRepository = userRepo;
  }

  async delete(email: string): Promise<DeleteEmployeeResponse>{

    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }

    await this.employeeRepository.delete(email);

    return right(employee)

  }
}