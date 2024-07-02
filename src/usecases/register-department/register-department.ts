import { InvalidNameError } from "../../entities/_errors";
import { Department } from "../../entities/department/department";
import { DepartmentData } from "../../entities/department/department-data";
import { Either, left, right } from "../../shared/either";
import { ManagerNotFoundError } from "../_errors/ManagerNotFound";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { DepartmentRepository } from "../_ports/department-repository";
import { EmployeeRepository } from "../_ports/employee-repository";
import { RegisterDepartmentInterface } from "./interface";
import { RegisterDepartmentResponse } from "./response";

export class RegisterDepartment implements RegisterDepartmentInterface {
  private readonly departmentRepository: DepartmentRepository;
  private readonly employeeRepository: EmployeeRepository

  constructor(departmentRepo: DepartmentRepository, employeeRepo: EmployeeRepository){
    this.departmentRepository = departmentRepo;
    this.employeeRepository = employeeRepo;
  }

  async register(departmentData: DepartmentData): Promise<RegisterDepartmentResponse> {

    const departmentOrError: Either<InvalidNameError, Department> = Department.create(departmentData);

    if (departmentOrError.isLeft()){
      return left(departmentOrError.value)
    }

    const department = departmentOrError.value;
    const exists = await this.departmentRepository.exists(department.name.value);
    if (exists){
      return left(new DuplicateDataError(department.name.value))
    }

    if (department.managerEmail){
      const managerExists = await this.employeeRepository.exists(department.managerEmail.value);
      
      if (!managerExists){
        return left(new ManagerNotFoundError(department.managerEmail.value))
      }
    }
    
    await this.departmentRepository.add(departmentData);

    return right(departmentData);

  }
}