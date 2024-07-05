import { SpyRoleRepository } from "./spy-role-repository";

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

const spyRoleRepository = new SpyRoleRepository(fakeDataBase);

describe('SpyRoleRepository validator', () => {
   test('Should return all roles in the repository', async () => {
    expect(await spyRoleRepository.findAllRoles()).toEqual(fakeDataBase)

  });

  test('Should return role by name', async () => {

    expect(await spyRoleRepository.findRoleByName(fakeDataBase[1].name))
      .toEqual(fakeDataBase[1]);
  });

  test('Should return null if name was not found', async () => {

    expect(await spyRoleRepository.findRoleByName('fakedepartment'))
      .toBe(null);
  });

  test('Should return true for existent role', async () => {
    expect(await spyRoleRepository.exists(fakeDataBase[1].name))
      .toBe(true);
  });

  test('Should return false for unexistent role', async () => {
    expect(await spyRoleRepository.exists('fakedepartment'))
      .toBe(false);
  });

  test('Should add new role to fake database', async () => {
    const newRole = {
      name: 'administration assistant',
      department: 'administration', 
    }

    await spyRoleRepository.add(newRole);

    expect(await spyRoleRepository.exists(newRole.name))
      .toBe(true);
  });
});