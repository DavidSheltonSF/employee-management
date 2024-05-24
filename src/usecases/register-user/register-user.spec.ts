import { RegisterUser } from "./register-user";
import { SpyUserRepository } from "../in-memory-user-repository/spy-user-repository";


const fakeDataBase = [
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
]

const spyUserRepository = new SpyUserRepository(fakeDataBase);
const registerUserUseCase = new RegisterUser(spyUserRepository)

const newUser = {
  name: 'NewUser',
  lastName: 'New', 
  email: 'new@bugmail.com',
  userRole: 'manager',
  password: 'new123'
}

describe('RegisterUser validator', () => {
  test('Should Register user correctly', async () => {
    
    const response = await registerUserUseCase.register(newUser);
    const user = await spyUserRepository.findUserByEmail(newUser.email);
    expect(user?.email)
      .toEqual(newUser.email);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if user was registered in repository
    expect(await spyUserRepository.findUserByEmail(newUser.email))
      .toEqual(newUser);
  })
})