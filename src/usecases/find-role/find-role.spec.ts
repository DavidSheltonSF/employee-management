import { FindRole } from "./find-role";
import { SpyRoleRepository } from "../_in-memory-role-repository/spy-role-repository";
import { left, right } from "../../shared/either";
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

const roleRepository = new SpyRoleRepository(fakeDataBase)
const findRoleUseCase = new FindRole(roleRepository)


describe('findRole validator', () => {

  test('Should find all Roles correctly', async () => {
    const allRoles = await findRoleUseCase.all()
    expect(allRoles).toEqual(right(fakeDataBase));
  });

  test('Should find a role by name correctly', async () => {
    const role = await findRoleUseCase.byName(fakeDataBase[1].name)
    expect(role).toEqual(right(fakeDataBase[1]));
  });

  test('Should not find a unexistent role by name', async () => {
    const result = await findRoleUseCase.byName('fakename@bugmail.com')
    expect(result).toEqual(left(new NoResultError('fakename@bugmail.com')));
  });

  
})