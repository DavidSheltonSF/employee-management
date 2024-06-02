import { EmployeeData } from "../../../entities/employee/employee-data";
import {faker} from "@faker-js/faker"

export const mock_user = (): EmployeeData => {

  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const birthday = faker.helpers.arrayElement([
    '2006-06-06',
    '1999-05-13',
    '2000-04-18',
  ])
  const gender = faker.helpers.arrayElement([
    'male',
    'female',
  ]);
  const roleAndDepartment = faker.helpers.arrayElement([
    {
      'role': 'developer',
      'department': 'technology'
    }, 
    {
      'role': 'analyst',
      'department': 'technology'
    }, 
    {
      'role': 'engineer',
      'department': 'technology'
    }, 
  ]);

  return {
    name,
    lastName,
    email,
    birthday,
    gender,
    role: roleAndDepartment['role'],
    department: roleAndDepartment['department']
  }
}