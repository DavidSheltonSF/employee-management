import { DeleteUser } from "./delete-user";
import { SpyUserRepository } from "../_in-memory-user-repository/spy-user-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";
import { TooYoungAgeError } from "../_errors/too-young-age";
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


describe('deleteUser validator', () => {

  test('Should delete User correctly', async () => {
    const employToDelete = {
      name: 'Marcos',
      lastName: 'Jeraldo', 
      email: 'marcos@bugmail.com',
      userRole: 'admin',
    password: 'marcos123'
    }

    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const deleteUserUseCase = new DeleteUser(spyUserRepository);
    
    const response = await deleteUserUseCase.delete(employToDelete.email);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyUserRepository.deleteParams['email'])
    .toEqual(employToDelete.email);
  });

  test('Should return NoResultError for a not registered email', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const deleteUserUseCase = new DeleteUser(spyUserRepository);

    const falseEmail = 'unexistentemail@bugmail.com'
    const response = await deleteUserUseCase.delete(falseEmail);

    expect(response).toEqual(left(new NoResultError(falseEmail)));
  })
})