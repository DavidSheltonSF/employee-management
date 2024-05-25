import { SpyEmployeeRepository } from "./spy-employee-repository";

const fakeDataBase = [
  {
    name: 'David',
    lastName: 'Shelton', 
    email: 'david@bugmail.com',
    birthday: '2002-02-26',
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
        name: 'David',
        lastName: 'Shelton', 
        email: 'david@bugmail.com',
        birthday: '2002-02-26',
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