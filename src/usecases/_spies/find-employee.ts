import { right } from "../../shared/either";
import { EmployeeRepository } from "../_ports/employee-repository";
import { FindEmployeeInterface as FindEmployee} from "../find-employee/interface";
import { FindEmployeeResponse } from "../find-employee/response";
import { mock_employee } from "./helper/mock_employee";


export class FindEmployeeSpy implements FindEmployee {
  private readonly employeeRepository: EmployeeRepository
  findByEmailParam: Record<string, string> = {};

  constructor(employeeRepo: EmployeeRepository){
    this.employeeRepository = employeeRepo;
  }

  async all(): Promise<FindEmployeeResponse>{

    const mockedEmployees = [];
    for(let i = 0; i < 3; i++){
      mockedEmployees.push(mock_employee());
    }

    return right(mockedEmployees);

  }

  async byEmail(email: string): Promise<FindEmployeeResponse>{

    this.findByEmailParam['email'] = email;

    return right(mock_employee());

  }
}