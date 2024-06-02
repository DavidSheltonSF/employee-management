import { SpyEmployeeRepository } from "../../../usecases/_in-memory-employee-repository/spy-employee-repository"
import { RegisterEmployeeSpy } from "../../../usecases/_spies/register-employee"
import { RegisterEmployeeController } from "./register-employee-controller"

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

describe('RegisterEmployeeController validator', () => {
  test('Should register employee correctly', async () => {
    
    const employeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const registerEmployeeUseCase = new RegisterEmployeeSpy(employeeRepository)
    const registerEmployeeController = new RegisterEmployeeController(registerEmployeeUseCase);

    const httpRequest = {
      body: {
        name: 'José',
        lastName: 'jo', 
        email: 'jose@bugmail.com',
        birthday: '2002-08-08',
        gender: 'male',
        role: 'analyst',
        department: 'technology'
      }
    }

    registerEmployeeController.handle(httpRequest);

    expect(registerEmployeeUseCase.registerParam['employeeData']).toEqual(httpRequest.body)

  })
})