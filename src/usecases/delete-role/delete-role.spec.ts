import { DeleteRole } from "./delete-role";
import { SpyRoleRepository } from "../_in-memory-role-repository/spy-role-repository";
import { left } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";


const fakeDataBase = [
  {
    name: 'developer',
    department: 'technology', 
  },
  {
    name: 'manager',
    department: 'administration', 
  },
]


describe('deleteRole validator', () => {

  test('Should delete Role correctly', async () => {


    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const deleteRoleUseCase = new DeleteRole(spyRoleRepository);
    
    const response = await deleteRoleUseCase.delete(fakeDataBase[0].name);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyRoleRepository.deleteParams['name'])
    .toEqual(fakeDataBase[0].name);
  });

  test('Should return NoResultError for a not registered name', async () => {
    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const deleteRoleUseCase = new DeleteRole(spyRoleRepository);

    const falseName = 'unexistentname@bugmail.com'
    const response = await deleteRoleUseCase.delete(falseName);

    expect(response).toEqual(left(new NoResultError(falseName)));
  })
})