import { SpyUserRepository } from "./spy-user-repository";

const fakeUsersDatabase = [
  {
    name: 'Marcos',
    lastName: 'Jeraldo', 
    email: 'marcos@bugmail.com',
    userRole: 'admin',
    password: 'marcos123'
  },
  {
    name: 'Maria',
    lastName: 'Carla', 
    email: 'maria@bugmail.com',
    userRole: 'manager',
    password: 'maria123'
  },
]

const spyUserRepository = new SpyUserRepository(fakeUsersDatabase);

describe('SpyUserRepository validator', () => {
   test('Should return all users in the repository', async () => {
    expect(await spyUserRepository.findAllUsers()).toEqual([
      {
        name: 'Marcos',
        lastName: 'Jeraldo', 
        email: 'marcos@bugmail.com',
        userRole: 'admin',
        password: 'marcos123'
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

  test('Should return user by email', async () => {

    expect(await spyUserRepository.findUserByEmail(fakeUsersDatabase[1].email))
      .toEqual(fakeUsersDatabase[1]);
  });

  test('Should return null if email was not found', async () => {

    expect(await spyUserRepository.findUserByEmail('thisEmailDoesNotExists@bugmai.com'))
      .toBe(null);
  });

  test('Should return true for existent user', async () => {
    expect(await spyUserRepository.exists(fakeUsersDatabase[1].email))
      .toBe(true);
  });

  test('Should return false for unexistent user', async () => {
    expect(await spyUserRepository.exists('thisEmailDoesNotExists@bugmai.com'))
      .toBe(false);
  });

  test('Should add new user to fake database', async () => {
    const newUser = {
      name: 'Jeraldo',
      lastName: 'Montes', 
      email: 'jeraldin@bugmail.com',
      userRole: 'manager',
      password: 'geralJeraldo123'
    }

    await spyUserRepository.add(newUser);

    expect(await spyUserRepository.exists(newUser.email))
      .toBe(true);
  });

})