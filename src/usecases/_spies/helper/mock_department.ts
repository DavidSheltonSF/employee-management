import { DepartmentData } from "../../../entities/department/department-data";
import {faker} from "@faker-js/faker"

export const mock_department = (): DepartmentData => {

  const name = faker.company.name();
  const managerEmail = faker.internet.email();

  return {
    name,
    managerEmail,
  }
}