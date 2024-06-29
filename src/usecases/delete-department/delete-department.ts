import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { DepartmentRepository } from "../_ports/department-repository";
import { DeleteDepartmentInterface } from "./interface";
import { DeleteDepartmentResponse } from "./response";

export class DeleteDepartment implements DeleteDepartmentInterface {
  private readonly departmentRepository: DepartmentRepository

  constructor(departmentRepo: DepartmentRepository){
    this.departmentRepository = departmentRepo;
  }

  async delete(name: string): Promise<DeleteDepartmentResponse>{

    const department = await this.departmentRepository.findDepartmentByName(name);

    if (!department){
      return left(new NoResultError(name))
    }

    await this.departmentRepository.delete(name);

    return right(department)
  }
}