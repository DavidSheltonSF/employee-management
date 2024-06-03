import { SpyUserRepository } from "../../../usecases/_in-memory-user-repository/spy-user-repository"
import { AlterUserSpy } from "../../../usecases/_spies/alter-user"
import { AlterUserController } from "./alter-user-controller"

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

describe('AlterUserController validator', () => {
  test('Should alter user correctly', async () => {
    
    const userRepository = new SpyUserRepository(fakeDataBase);
    const alterUserUseCase = new AlterUserSpy(userRepository)
    const alterUserController = new AlterUserController(alterUserUseCase);

    const httpRequest = {
      body: {
        name: 'José',
        lastName: 'jo', 
        email: 'jose@bugmail.com',
        userRole: 'manager',
        password: 'jose123'
      }
    }

    alterUserController.handle(httpRequest);

    expect(alterUserUseCase.alterParam['userData']).toEqual(httpRequest.body)

  })
})