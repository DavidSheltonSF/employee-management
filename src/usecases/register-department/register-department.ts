import { InvalidNameError } from "../../entities/_errors";
import { Department } from "../../entities/department/department";
import { DepartmentData } from "../../entities/department/department-data";
import { Employee } from "../../entities/employee/employee";
import { Either, left, right } from "../../shared/either";
import { ManagerNotFoundError } from "../_errors/ManagerNotFoundError";
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
      console.log('SOME ERROR')
      return left(departmentOrError.value)
    }

    const department = departmentOrError.value;
    const exists = this.departmentRepository.exists(department.name.value);
    if ((await exists).valueOf()){
      console.log('DUPLICATED')
      return left(new DuplicateDataError(department.name.value))
    }

    if (department.managerEmail){
      const managerExists = await this.employeeRepository.exists(department.managerEmail.value);
      console.log(managerExists);
      console.log(department)
      if (!managerExists){
        console.log('ManagerNotFound')
        return left(new ManagerNotFoundError(department.managerEmail.value))
      }
    }
    
    await this.departmentRepository.add(departmentData);

    return right(departmentData);

  }
}