import { RegisterEmployee } from "./register-employee";
import { SpyEmployeeRepository } from "../_in-memory-employee-repository/spy-employee-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";
import { TooYoungAgeError } from "../_errors/too-young-age";
import { SpyDepartmentRepository } from "../_in-memory-department-repository/spy-department-repository";
import { UnknownDepartmentError } from "../_errors/unknownDepartment";


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

const fakeDepartments = [
  {
    name: 'technology',
    managerEmail: 'julia@bugmail.com'
  },
  {
    name: 'security',
    managerEmail: 'marcos@bugmail.com'
  },
  {
    name: 'administration',
    managerEmail: 'marcos@bugmail.com'
  }
]



describe('RegisterEmployee validator', () => {
  const newEmployee = {
    name: 'NewEmployee',
    lastName: 'New', 
    email: 'new@bugmail.com',
    birthday: '2000-05-11',
    gender: 'female',
    role: 'manager',
    department: 'administration'
  }


  test('Should Register Employee correctly', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartments)

    const registerEmployeeUseCase = new RegisterEmployee(
      spyEmployeeRepository,
      spyDepartmentRepository
    );
    
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

  test('Should not register a employee younger than 18', async () => {
    const newEmployee = {
      name: 'NewEmployee',
      lastName: 'New', 
      email: 'new@bugmail.com',
      birthday: '2015-05-11',
      gender: 'female',
      role: 'manager',
      department: 'administration'
    }

    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartments)

    const registerEmployeeUseCase = new RegisterEmployee(
      spyEmployeeRepository,
      spyDepartmentRepository
    );
    const response = await registerEmployeeUseCase.register(newEmployee)

    expect(response).toEqual(left(new TooYoungAgeError(newEmployee.birthday)));
    expect(spyEmployeeRepository.addParams).toEqual({});
  
  })
  
  test('Should not register Employee that already exists', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartments)

    const registerEmployeeUseCase = new RegisterEmployee(
      spyEmployeeRepository,
      spyDepartmentRepository
    );

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
    expect(spyEmployeeRepository.addParams).toEqual({});
  });

  test('Should not register Employee with an unknown department', async () => {
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartments)

    const registerEmployeeUseCase = new RegisterEmployee(
      spyEmployeeRepository,
      spyDepartmentRepository
    );

    const duplicatedEmployee = {
      name: 'Maria',
      lastName: 'Carla', 
      email: 'maria@bugmail.com',
      birthday: '2000-05-11',
      gender: 'female',
      role: 'manager',
      department: 'unexistent'
    }
    
    const response = await registerEmployeeUseCase.register(duplicatedEmployee);
    expect(response).toEqual(left(new UnknownDepartmentError(duplicatedEmployee.department)));
    // Checking if Employee was not registered in repository
    expect(spyEmployeeRepository.addParams).toEqual({});
  });
  
})