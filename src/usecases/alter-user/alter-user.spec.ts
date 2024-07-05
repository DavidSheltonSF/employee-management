import { AlterUser } from "./alter-user";
import { SpyUserRepository } from "../_in-memory-user-repository/spy-user-repository";
import { left } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";


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


describe('alterUser validator', () => {

  test('Should alter User correctly', async () => {

    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserUseCase = new AlterUser(spyUserRepository);
    
    const response = await alterUserUseCase.alter('marcos@bugmail.com', {
      name: 'Antonio',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      userRole: 'admin',
      password: 'marcos123'
    });

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyUserRepository.updateParams['userData'])
      .toEqual({
        name: 'Antonio',
        lastName: 'Jeraldo', 
        email: 'marcos@bugmail.com',
        userRole: 'admin',
        password: 'marcos123'
      });
  });

  test('Should return NoResultError for a not registered email', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserUseCase = new AlterUser(spyUserRepository);

    const fakeUser = {
      name: 'Faken',
      lastName: 'Fekenaldo', 
      email: 'fake@bugmail.com',
      userRole: 'admin',
      password: 'fake123'
    }
    const response = await alterUserUseCase.alter('fake@bugmail.com', fakeUser);

    expect(response).toEqual(left(new NoResultError(fakeUser.email)));
  })
})