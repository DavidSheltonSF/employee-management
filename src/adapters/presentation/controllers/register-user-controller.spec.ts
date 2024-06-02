import { SpyUserRepository } from "../../../usecases/_in-memory-user-repository/spy-user-repository"
import { RegisterUserSpy } from "../../../usecases/_spies/register-user"
import { RegisterUserController } from "./register-user-controller copy"

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

describe('RegisterUserController validator', () => {
  test('Should register user correctly', async () => {
    
    const userRepository = new SpyUserRepository(fakeDataBase);
    const registerUserUseCase = new RegisterUserSpy(userRepository)
    const registerUserController = new RegisterUserController(registerUserUseCase);

    const httpRequest = {
      body: {
        name: 'José',
        lastName: 'jo', 
        email: 'jose@bugmail.com',
        userRole: 'manager',
        password: 'jose123'
      }
    }

    registerUserController.handle(httpRequest);

    expect(registerUserUseCase.registerParam['userData']).toEqual(httpRequest.body)

  })
})