import { RegisterEmployee } from "./register-employee";
import { SpyEmployeeRepository } from "../_in-memory-employee-repository/spy-employee-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";


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

const newEmployee = {
  name: 'NewEmployee',
  lastName: 'New', 
  email: 'new@bugmail.com',
  birthday: '2000-05-11',
  gender: 'female',
  role: 'manager',
  department: 'administration'
}

describe('RegisterEmployee validator', () => {
  test('Should Register Employee correctly', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const registerEmployeeUseCase = new RegisterEmployee(spyEmployeeRepository);
    
    const response = await registerEmployeeUseCase.register(newEmployee);
    const employee = await spyEmployeeRepository.findEmployeeByEmail(newEmployee.email);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    expect(employee?.email)
      .toEqual(newEmployee.email);

    

    // Checking if Employee was registered in repository
    expect(await spyEmployeeRepository.findEmployeeByEmail(newEmployee.email))
      .toEqual(newEmployee);

    expect(spyEmployeeRepository.addParams['EmployeeData'])
    .toEqual(newEmployee);
  });
  /*
  test('Should not register Employee that already exists', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const registerEmployeeUseCase = new RegisterEmployee(spyEmployeeRepository);

    const duplicatedEmployee = {
      name: 'Maria',
      lastName: 'Carla', 
      email: 'maria@bugmail.com',
      birthday: '2000-05-11',
      gender: 'female',
      role: 'manager',
      department: 'administration'
    }
    
    const response = await registerEmployeeUseCase.register(duplicatedEmployee);
    expect(response).toEqual(left(new DuplicateDataError(duplicatedEmployee.email)));
    // Checking if Employee was not registered in repository
    expect(spyEmployeeRepository.addParams)
      .toEqual({});
  });
  */
})