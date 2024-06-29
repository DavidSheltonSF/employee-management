import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { DepartmentRepository } from "../_ports/department-repository";
import { AlterDepartmentInterface } from "./interface";
import { AlterDepartmentResponse } from "./response";
import { DepartmentData } from "../../entities/department/department-data";

export class AlterDepartment implements AlterDepartmentInterface {
  private readonly departmentRepository: DepartmentRepository

  constructor(departmentRepo: DepartmentRepository){
    this.departmentRepository = departmentRepo;
  }

  async alter(departmentData: DepartmentData): Promise<AlterDepartmentResponse>{
    const { name } = departmentData
    const department = await this.departmentRepository.findDepartmentByName(name);
    if (!department){
      return left(new NoResultError(name))
    }

    await this.departmentRepository.update(departmentData);

    return right(department)
  }
}