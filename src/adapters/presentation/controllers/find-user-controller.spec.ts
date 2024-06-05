import { right } from "../../../shared/either"
import { SpyUserRepository } from "../../../usecases/_in-memory-user-repository/spy-user-repository"
import { FindUserSpy } from "../../../usecases/_spies/find-user"
import { FindUserController } from "./find-user-controller"

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

describe('FindUserController validator', () => {
  test('Should find all user correctly', async () => {
    
    const userRepository = new SpyUserRepository(fakeDataBase);
    const findUserUseCase = new FindUserSpy(userRepository)
    const findUserController = new FindUserController(findUserUseCase);

    const httpRequest = {
      body: {}
    }

    const response = await findUserController.handle(httpRequest);

    expect(response.statusCode).toBe(200);

  });

  test('Should find all user correctly', async () => {
    
    const userRepository = new SpyUserRepository(fakeDataBase);
    const findUserUseCase = new FindUserSpy(userRepository)
    const findUserController = new FindUserController(findUserUseCase);

    const httpRequest = {
      viewArgs: {
        email: 'jon@bugmail.com'
      },
      body: {}
    }

    const response = await findUserController.handle(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(findUserUseCase.findByEmailParam['email']).toEqual('jon@bugmail.com');

  });
})