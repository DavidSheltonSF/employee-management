import { AlterRole } from "./alter-role";
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

describe('alterRole validator', () => {

  test('Should alter Role correctly', async () => {

    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const alterRoleUseCase = new AlterRole(spyRoleRepository);
    
    const response = await alterRoleUseCase.alter('manager', {
      name: 'assistant',
      department: 'technology', 
    });

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyRoleRepository.updateParams['roleData'])
      .toEqual({
        name: 'assistant',
        department: 'technology', 
      });
  });

  test('Should return NoResultError for a not registered name', async () => {
    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const alterRoleUseCase = new AlterRole(spyRoleRepository);

    const fakeRole = {
      name: 'faken',
      department: 'fekenaldo', 
    }
    const response = await alterRoleUseCase.alter(fakeRole.name, fakeRole);

    expect(response).toEqual(left(new NoResultError(fakeRole.name)));
  })
})