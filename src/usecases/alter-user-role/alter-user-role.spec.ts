import { right } from "../../shared/either";
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
    
    const response = await alterUserRole.alterUserRole('maria@bugmail.com', 'viwer');

    // Check if response is valid
    expect(response).toEqual(right(true));
    // Check if paramethers were added to spy correctly
  })
})