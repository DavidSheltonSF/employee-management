import { SpyEmployeeRepository } from "../../../usecases/_in-memory-employee-repository/spy-employee-repository"
import { AlterEmployeeSpy } from "../../../usecases/_spies/alter-employee"
import { AlterEmployeeController } from "./alter-employee-controller"

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
  {
    name: 'José',
    lastName: 'jo', 
    email: 'jose@bugmail.com',
    birthday: '2000-02-05',
    gender: 'male',
    role: 'developer',
    department: 'technology'
  }
]

describe('AlterEmployeeController validator', () => {
  test('Should alter employee correctly', async () => {
    
    const employeeRepository = new SpyEmployeeRepository(fakeDataBase);
    const alterEmployeeUseCase = new AlterEmployeeSpy(employeeRepository)
    const alterEmployeeController = new AlterEmployeeController(alterEmployeeUseCase);

    const httpRequest = {
      body: {
        name: 'José',
        lastName: 'João', 
        email: 'jose@bugmail.com',
        birthday: '2000-02-05',
        gender: 'male',
        role: 'developer',
        department: 'technology'
      }
    }

    const response = await alterEmployeeController.handle(httpRequest);

    expect(response.statusCode).toEqual(200);

    expect(alterEmployeeUseCase.alterParam['employeeData']).toEqual(httpRequest.body)

  })
})