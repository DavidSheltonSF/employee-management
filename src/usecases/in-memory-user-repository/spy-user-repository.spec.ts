import { SpyUserRepository } from "./spy-user-repository";


describe('SpyUserRepository validator', () => {
   test('Should return all users in the repository', async () => {
    const spyUserRepository = new SpyUserRepository([
      {
        name: 'David',
        lastName: 'Shelton', 
        email: 'david@bugmail.com',
        userRole: 'admin',
        password: 'david123'
      },
      {
        name: 'Maria',
        lastName: 'Carla', 
        email: 'maria@bugmail.com',
        userRole: 'manager',
        password: 'maria123'
      },
    ]);
    
    expect(await spyUserRepository.findAllUsers()).toEqual([
      {
        name: 'David',
        lastName: 'Shelton', 
        email: 'david@bugmail.com',
        userRole: 'admin',
        password: 'david123'
      },
      {
        name: 'Maria',
        lastName: 'Carla', 
        email: 'maria@bugmail.com',
        userRole: 'manager',
        password: 'maria123'
      }
    ])

  });
})