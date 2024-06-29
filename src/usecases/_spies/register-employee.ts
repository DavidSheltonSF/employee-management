import { right, left } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { EmployeeData } from "../../entities/employee/employee-data";
import { EmployeeRepository } from "../_ports/employee-repository";
import { RegisterEmployeeInterface as RegisterEmployee} from "../register-employee/interface";
import { RegisterEmployeeResponse } from "../register-employee/response";
import { mock_employee } from "./helper/mock_employee";
import { Employee } from "../../entities/employee/employee";

export class RegisterEmployeeSpy implements RegisterEmployee {
  private readonly employeeRepository: EmployeeRepository
  registerParam: Record<string, EmployeeData> = {};

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async register(employeeData: EmployeeData): Promise<RegisterEmployeeResponse> {

    this.registerParam['employeeData'] = employeeData;

    const employeeOrError = Employee.create(employeeData);

    if (employeeOrError.isLeft()){
      return left(employeeOrError.value)
    }

    const employee = employeeOrError.value;

    const exists = this.employeeRepository.exists(employee.email.value);
    if ((await exists).valueOf()){
      return left(new DuplicateDataError(employee.email.value))
    }
    
    return right(mock_employee());
  }
}