import { RegisterUser } from "./register-user";
import { SpyUserRepository } from "../_in-memory-user-repository/spy-user-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";


const fakeDataBase = [
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
]

const newUser = {
  name: 'NewUser',
  lastName: 'New', 
  email: 'new@bugmail.com',
  userRole: 'manager',
  password: 'new123'
}

describe('RegisterUser validator', () => {
  test('Should Register user correctly', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const registerUserUseCase = new RegisterUser(spyUserRepository);
    
    const response = await registerUserUseCase.register(newUser);
    const user = await spyUserRepository.findUserByEmail(newUser.email);
    expect(user?.email)
      .toEqual(newUser.email);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if user was registered in repository
    expect(await spyUserRepository.findUserByEmail(newUser.email))
      .toEqual(newUser);

      expect(spyUserRepository.addParams['userData'])
      .toEqual(newUser);
  });

  test('Should not register user that already exists', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const registerUserUseCase = new RegisterUser(spyUserRepository);

    const duplicatedUser = {
      name: 'Maria',
      lastName: 'Carla', 
      email: 'maria@bugmail.com',
      userRole: 'manager',
      password: 'maria123'
    }
    
    const response = await registerUserUseCase.register(duplicatedUser);
    expect(response).toEqual(left(new DuplicateDataError(duplicatedUser.email)));
    // Checking if user was not registered in repository
    expect(spyUserRepository.addParams)
      .toEqual({});
  });
})