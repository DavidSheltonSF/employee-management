import { RegisterRole } from "./register-role";
import { SpyRoleRepository } from "../_in-memory-role-repository/spy-role-repository";
import { DuplicateDataError } from "../_errors/duplicate-data";
import { left } from "../../shared/either";


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

const newRole = {
  name: 'NewRole',
  department: 'departmentx', 
}

describe('RegisterRole validator', () => {
  test('Should Register role correctly', async () => {
    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const registerRoleUseCase = new RegisterRole(spyRoleRepository);
    
    const response = await registerRoleUseCase.register(newRole);
    const role = await spyRoleRepository.findRoleByName(newRole.name);
    expect(role?.name)
      .toEqual(newRole.name);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if role was registered in repository
    expect(await spyRoleRepository.findRoleByName(newRole.name))
      .toEqual(newRole);

      expect(spyRoleRepository.addParams['roleData'])
      .toEqual(newRole);
  });

  test('Should not register role that already exists', async () => {
    const spyRoleRepository = new SpyRoleRepository(fakeDataBase);
    const registerRoleUseCase = new RegisterRole(spyRoleRepository);

    const duplicatedRole = {
      name: 'manager',
      department: 'administration', 
    }
    
    const response = await registerRoleUseCase.register(duplicatedRole);
    expect(response).toEqual(left(new DuplicateDataError(duplicatedRole.name)));
    // Checking if role was not registered in repository
    expect(spyRoleRepository.addParams)
      .toEqual({});
  });
})