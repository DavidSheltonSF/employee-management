import { FindEmployee } from "./find-employee";
import { SpyEmployeeRepository } from "../_in-memory-employee-repository/spy-employee-repository";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";


const fakeDataBase = [
  {
    name: 'Marcos',
    lastName: 'Jeraldo', 
    email: 'marcos@bugmail.com',
    birthday: '2000-05-30',
    gender: 'male',
    role: 'developer',
    department: 'techlonogy'
  },
  {
    name: 'Maria',
    lastName: 'Carla', 
    email: 'maria@bugmail.com',
    birthday: '2000-05-11',
    gender: 'female',
    role: 'manager',
    department: 'administration'
  },
]

const employeeRepository = new SpyEmployeeRepository(fakeDataBase)
const findEmployeeUseCase = new FindEmployee(employeeRepository)


describe('findEmployee validator', () => {

  test('Should find all Employees correctly', async () => {
    const allEmployees = await findEmployeeUseCase.all()

    expect(allEmployees).toEqual(right(fakeDataBase));
  });

  test('Should find a employee by email correctly', async () => {
    const employee = await findEmployeeUseCase.byEmail(fakeDataBase[1].email)

    expect(employee).toEqual(right(fakeDataBase[1]));
  });

  test('Should not find a unexistent employee by email', async () => {
    const result = await findEmployeeUseCase.byEmail('fakeemail@bugmail.com')

    expect(result).toEqual(left(new NoResultError('fakeemail@bugmail.com')));
  });

  
})