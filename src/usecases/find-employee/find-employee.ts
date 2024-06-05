import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { EmployeeRepository } from "../_ports/employee-repository";
import { FindEmployeeInterface } from "./interface";
import { FindEmployeeResponse } from "./response";

export class FindEmployee implements FindEmployeeInterface {
  private readonly employeeRepository: EmployeeRepository

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async all(): Promise<FindEmployeeResponse>{

    const result = await this.employeeRepository.findAllEmployees();

    return right(result);

  }

  async byEmail(email: string): Promise<FindEmployeeResponse>{

    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }

    return right(employee);

  }
  
}