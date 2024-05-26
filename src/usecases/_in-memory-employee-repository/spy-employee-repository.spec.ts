import { SpyEmployeeRepository } from "./spy-employee-repository";

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

const spyEmployeeRepository = new SpyEmployeeRepository(fakeDataBase);

describe('SpyEmployeeRepository validator', () => {
   test('Should return all Employees in the repository', async () => {
    expect(await spyEmployeeRepository.findAllEmployees()).toEqual([
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
      }
    ])

  });

})