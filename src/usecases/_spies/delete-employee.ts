import { right, left } from "../../shared/either";
import { EmployeeRepository } from "../_ports/employee-repository";
import { DeleteEmployeeInterface as DeleteEmployee } from "../delete-employee/interface";
import { DeleteEmployeeResponse } from "../delete-employee/response";
import { mock_employee } from "./helper/mock_employee";
import { NoResultError } from "../_errors/no-result";

export class DeleteEmployeeSpy implements DeleteEmployee {
  private readonly employeeRepository: EmployeeRepository
  deleteParam: Record<string, string> = {};

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async delete(email: string): Promise<DeleteEmployeeResponse> {

    this.deleteParam['email'] = email;
    
    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee){
      return left(new NoResultError(email))
    }
    return right(mock_employee());
  }
}