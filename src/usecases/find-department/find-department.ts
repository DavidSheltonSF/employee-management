import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { DepartmentRepository } from "../_ports/department-repository";
import { FindDepartmentInterface } from "./interface";
import { FindDepartmentResponse } from "./response";

export class FindDepartment implements FindDepartmentInterface {
  private readonly departmentRepository: DepartmentRepository

  constructor(departmentRepo: DepartmentRepository){
    this.departmentRepository = departmentRepo;
  }

  async all(): Promise<FindDepartmentResponse>{

    const result = await this.departmentRepository.findAllDepartments();

    return right(result);

  }

  async byName(name: string): Promise<FindDepartmentResponse>{

    const department = await this.departmentRepository.findDepartmentByName(name);
    console.log(department)
    if (!department){
      return left(new NoResultError(name))
    }

    return right(department);
  }
}