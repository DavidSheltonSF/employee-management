import { FindUser } from "./find-user";
import { SpyUserRepository } from "../_in-memory-user-repository/spy-user-repository";
import { left, right } from "../../shared/either";
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

const userRepository = new SpyUserRepository(fakeDataBase)
const findUserUseCase = new FindUser(userRepository)


describe('findUser validator', () => {

  test('Should find all Users correctly', async () => {
    const allUsers = await findUserUseCase.all()

    expect(allUsers).toEqual(right(fakeDataBase));
  });

  test('Should find a user by email correctly', async () => {
    const user = await findUserUseCase.byEmail(fakeDataBase[1].email)

    expect(user).toEqual(right(fakeDataBase[1]));
  });

  test('Should not find a unexistent user by email', async () => {
    const result = await findUserUseCase.byEmail('fakeemail@bugmail.com')

    expect(result).toEqual(left(new NoResultError('fakeemail@bugmail.com')));
  });

  
})