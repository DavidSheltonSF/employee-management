import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";
import { SpyUserRepository } from "../_in-memory-user-repository/spy-user-repository"
import { AlterUserRole } from "./alter-user-role";

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

describe('AlterUserRole tester', () => {
  test('Should alter the user role correctly', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserRole = new AlterUserRole(spyUserRepository);
    
    const response = await alterUserRole
    .alterUserRole(fakeDataBase[1].email, 'viwer');

    // Check if response is valid
    expect(response).toEqual(right(true));

    // Check if paramethers were added to spy correctly

    expect(spyUserRepository.updateParams['email'])
      .toEqual(fakeDataBase[1].email);
    
    expect(spyUserRepository.updateParams['userData'])
      .toEqual(fakeDataBase[1]);

  });

  test('Should not alter user with not registred email', async () => {
    const spyUserRepository = new SpyUserRepository(fakeDataBase);
    const alterUserRole = new AlterUserRole(spyUserRepository);
    const response = await alterUserRole.alterUserRole('notregistred@bugmail.com', 'viwer');
    // Check if response is invalid
    expect(response).toEqual(left(new NoResultError('notregistred@bugmail.com')));
    // Check if paramethers were added to spy correctly
    expect(spyUserRepository.updateParams).toEqual({});
  })
})