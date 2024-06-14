import { RegisterDepartment } from "./register-department";
import { SpyDepartmentRepository } from "../_in-memory-department-repository /spy-department-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";
import { ManagerNotFoundError } from "../_errors/ManagerNotFoundError";
import { SpyEmployeeRepository } from "../_in-memory-employee-repository/spy-employee-repository";


const fakeDepartmentsDatabase = [
  {
    name: 'legal',
    managerEmail: 'marcos@bugmail.com', 
  },
  {
    name: 'administration',
    managerEmail: 'maria@bugmail.com', 
  },
]

const fakeEmployeeDataBase = [
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
    department: 'administration'
  },
  {
    name: 'Antônia',
    lastName: 'Marta', 
    email: 'tonia@bugmail.com',
    birthday: '2000-05-11',
    gender: 'female',
    role: 'Manager',
    department: 'technology'
  },
]


describe('RegisterDepartment validator', () => {
  
  test('Should Register department correctly', async () => {

    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeEmployeeDataBase);
    const registerDepartmentUseCase = new RegisterDepartment(spyDepartmentRepository, spyEmployeeRepository);
    
    const newDepartment = {
      name: 'NewDepartment',
      managerEmail: 'maria@bugmail.com',
    }

    const response = await registerDepartmentUseCase.register(newDepartment);
    const department = await spyDepartmentRepository.findDepartmentByName(newDepartment.name);
    expect(department?.managerEmail)
      .toEqual(newDepartment.managerEmail);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if department was registered in repository
    
    expect(await spyDepartmentRepository.findDepartmentByName(newDepartment.name))
      .toEqual(newDepartment);
    
    expect(spyDepartmentRepository.addParams['departmentData'])
    .toEqual(newDepartment);
    
  });
  
  test('Should Register department with no manager email', async () => {

    const noManagerDepartment = {
      name: 'noManagerDepartment',
    }

    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeEmployeeDataBase);
    const registerDepartmentUseCase = new RegisterDepartment(spyDepartmentRepository, spyEmployeeRepository);
    
    const response = await registerDepartmentUseCase.register(noManagerDepartment);
    const department = await spyDepartmentRepository.findDepartmentByName(noManagerDepartment.name);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if department was registered in repository
    expect(department?.name)
      .toEqual(noManagerDepartment.name);

    expect(spyDepartmentRepository.addParams['departmentData'])
    .toEqual(noManagerDepartment);
  });
  
  
  test('Should not register department that already exists', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    const spyEmployeeRepository = new SpyEmployeeRepository(fakeEmployeeDataBase);
    const registerDepartmentUseCase = new RegisterDepartment(spyDepartmentRepository, spyEmployeeRepository);

    const duplicatedDepartment = {
      name: 'administration',
      managerEmail: 'maria@bugmail.com',
    }
    
    const response = await registerDepartmentUseCase.register(duplicatedDepartment);
    expect(response).toEqual(left(new DuplicateDataError(duplicatedDepartment.name)));
    // Checking if department was not registered in repository
    expect(spyDepartmentRepository.addParams)
      .toEqual({});
  });
  
})