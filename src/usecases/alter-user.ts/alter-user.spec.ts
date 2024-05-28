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
    const employToAlter = {
      name: 'Marcos',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      userRole: 'admin',
    password: 'marcos123'
    }

    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserUseCase = new AlterUser(spyUserRepository);
    
    const response = await alterUserUseCase.alter(employToAlter.email, employToAlter);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyUserRepository.updateParams['email'])
    .toEqual(employToAlter.email);
  });

  test('Should return NoResultError for a not registered email', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserUseCase = new AlterUser(spyUserRepository);

    const falseEmail = 'unexistentemail@bugmail.com'
    const response = await alterUserUseCase.alter(falseEmail, fakeDataBase[0]);

    expect(response).toEqual(left(new NoResultError(falseEmail)));
  })
})