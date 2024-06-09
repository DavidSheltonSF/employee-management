import { InvalidNameError } from "../../entities/_errors";
import { Department } from "../../entities/department/department";
import { DepartmentData } from "../../entities/department/department-data";
import { Either, left, right } from "../../shared/either";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { DepartmentRepository } from "../_ports/department-repository";
import { RegisterDepartmentInterface } from "./interface";
import { RegisterDepartmentResponse } from "./response";

export class RegisterDepartment implements RegisterDepartmentInterface {
  private readonly departmentRepository: DepartmentRepository;

  constructor(departmentRepo: DepartmentRepository){
    this.departmentRepository = departmentRepo;
  }

  async register(departmentData: DepartmentData): Promise<RegisterDepartmentResponse> {

    const departmentOrError: Either<InvalidNameError, Department> = Department.create(departmentData);

    if (departmentOrError.isLeft()){
      return left(departmentOrError.value)
    }

    const department = departmentOrError.value;
    const exists = this.departmentRepository.exists(department.managerEmail.value);
    if ((await exists).valueOf()){
      return left(new DuplicateDataError(department.managerEmail.value))
    }

    await this.departmentRepository.add(departmentData);

    return right(departmentData);

  }
}