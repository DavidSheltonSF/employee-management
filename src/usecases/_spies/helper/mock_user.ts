import { UserData } from "../../../entities/user/user-data";
import {faker} from "@faker-js/faker"

export const mock_user = (): UserData => {

  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password({length: 6});
  const userRole = faker.helpers.arrayElement([
    'admin',
    'manager',
    'employee',
    'viewer'
  ])

  return {
    name,
    lastName,
    email,
    password,
    userRole
  }
}