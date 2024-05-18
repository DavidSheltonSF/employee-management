import { Birthday, Department } from "../validators";
import { Employee } from "./employee";

describe('Empoyee validator', () => {
  test('Should create valid employee', () => {
    const employeeData = {
      name: 'Fernando',
      lastName: 'Bento',
      email: 'bento@bugmail.com',
      birthday: '2002-05-20',
      gender: 'male',
      role: 'developer',
      department: 'information_technology'
    }
    
    const employeeOrError = Employee.create(employeeData)

    expect(employeeOrError).toEqual(Employee.create(employeeData));
  })
})