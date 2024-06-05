import { right, left } from "../../shared/either";
import { EmployeeData } from "../../entities/employee/employee-data";
import { EmployeeRepository } from "../_ports/employee-repository";
import { AlterEmployeeInterface as AlterEmployee } from "../alter-employee/interface";
import { AlterEmployeeResponse } from "../alter-employee/response";
import { mock_employee } from "./helper/mock_employee";
import { NoResultError } from "../_errors/no-result";

export class AlterEmployeeSpy implements AlterEmployee {
  private readonly employeeRepository: EmployeeRepository
  alterParam: Record<string, EmployeeData> = {};

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async alter(employeeData: EmployeeData): Promise<AlterEmployeeResponse> {

    this.alterParam['employeeData'] = employeeData;

    const { email } = employeeData;
    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }

    return right(mock_employee());

  }
}