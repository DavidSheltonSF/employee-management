import { DeleteEmployee } from "./delete-employee";
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
    role: 'manager',
    department: 'administration'
  },
]


describe('deleteEmployee validator', () => {
  const newEmployee = {
    name: 'NewEmployee',
    lastName: 'New', 
    email: 'new@bugmail.com',
    birthday: '2000-05-11',
    gender: 'female',
    role: 'manager',
    department: 'administration'
  }

  test('Should delete Employee correctly', async () => {
    const employToDelete = {
      name: 'Marcos',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      birthday: '2000-05-30',
      gender: 'male',
      role: 'developer',
      department: 'techlonogy'
    }

    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const deleteEmployeeUseCase = new DeleteEmployee(spyEmployeeRepository);
    
    const response = await deleteEmployeeUseCase.delete(employToDelete.email);
    const employee = await spyEmployeeRepository.findEmployeeByEmail(newEmployee.email);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if Employee was deleted from repository
    expect(employee?.email)
      .toBeFalsy()

    // Checking if params were added to the repository correctly
    expect(spyEmployeeRepository.deleteParams['email'])
    .toEqual(employToDelete.email);
  });

  test('Should return NoResultError for a not registered email', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const deleteEmployeeUseCase = new DeleteEmployee(spyEmployeeRepository);

    const falseEmail = 'unexistentemail@bugmail.com'
    const response = await deleteEmployeeUseCase.delete(falseEmail);

    expect(response).toEqual(left(new NoResultError(falseEmail)));
  })
})