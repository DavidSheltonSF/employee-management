import { AlterEmployee } from "./alter-employee";
import { SpyEmployeeRepository } from "../_in-memory-employee-repository/spy-employee-repository";
import { left } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";

const fakeDataBase = [
  {
    name: 'Marcos',
    lastName: 'Jeraldo', 
    email: 'marcos@bugmail.com',
    birthday: '2000-05-30',
    gender: 'male',
    role: 'developer',
    department: 'techlonogy'
  },
  {
    name: 'Maria',
    lastName: 'Carla', 
    email: 'maria@bugmail.com',
    birthday: '2000-05-11',
    gender: 'female',
    role: 'Manager',
    department: 'Administration'
  },
]

describe('alterEmployee validator', () => {

  test('Should alter Employee correctly', async () => {

    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const alterEmployeeUseCase = new AlterEmployee(spyEmployeeRepository);

    const response = await alterEmployeeUseCase.alter({
      name: 'Marcos',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      birthday: '2000-05-30',
      gender: 'male',
      role: 'enginner',
      department: 'techlonogy'
    });

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyEmployeeRepository.updateParams['employeeData'])
    .toEqual({
      name: 'Marcos',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      birthday: '2000-05-30',
      gender: 'male',
      role: 'enginner',
      department: 'techlonogy'
    });
  });
  
  test('Should return NoResultError for a not registered email', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const alterEmployeeUseCase = new AlterEmployee(spyEmployeeRepository);

    const unexistentEmployee = {
      name: 'Existent',
      lastName: 'Not', 
      email: 'unexistentemail@bugmail.com',
      birthday: '2000-05-30',
      gender: 'male',
      role: 'enginner',
      department: 'techlonogy'
    }

    const response = await alterEmployeeUseCase.alter(unexistentEmployee);

    expect(response).toEqual(left(new NoResultError(unexistentEmployee.email)));
  })
  
})