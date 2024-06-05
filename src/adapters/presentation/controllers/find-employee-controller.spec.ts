import { SpyEmployeeRepository } from "../../../usecases/_in-memory-employee-repository/spy-employee-repository"
import { FindEmployeeSpy } from "../../../usecases/_spies/find-employee"
import { FindEmployeeController } from "./find-employee-controller"

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

describe('FindEmployeeController validator', () => {
  test('Should find all employee correctly', async () => {
    
    const employeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const findEmployeeUseCase = new FindEmployeeSpy(employeeRepository)
    const findEmployeeController = new FindEmployeeController(findEmployeeUseCase);

    const httpRequest = {
      body: {}
    }

    const response = await findEmployeeController.handle(httpRequest);

    expect(response.statusCode).toBe(200);

  });

  test('Should find all employee correctly', async () => {
    
    const employeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const findEmployeeUseCase = new FindEmployeeSpy(employeeRepository)
    const findEmployeeController = new FindEmployeeController(findEmployeeUseCase);

    const httpRequest = {
      viewArgs: {
        email: 'jon@bugmail.com'
      },
      body: {}
    }

    const response = await findEmployeeController.handle(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(findEmployeeUseCase.findByEmailParam['email']).toEqual('jon@bugmail.com');

  });
})