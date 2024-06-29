import { FindDepartment } from "./find-department";
import { SpyDepartmentRepository } from "../_in-memory-department-repository/spy-department-repository";
import { left, right } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";


const fakeDataBase = [                                                      
  {
    name: 'Marcos',
    lastName: 'Jeraldo', 
    email: 'marcos@bugmail.com',
    departmentRole: 'admin',
    password: 'marcos123'
  },
  {
    name: 'Maria',
    lastName: 'Carla', 
    email: 'maria@bugmail.com',
    departmentRole: 'manager',
    password: 'maria123'
  }
]

const departmentRepository = new SpyDepartmentRepository(fakeDataBase)
const findDepartmentUseCase = new FindDepartment(departmentRepository)


describe('findDepartment validator', () => {

  test('Should find all Departments correctly', async () => {
    const allDepartments = await findDepartmentUseCase.all()

    expect(allDepartments).toEqual(right(fakeDataBase));
  });

  test('Should find a department by email correctly', async () => {
    const department = await findDepartmentUseCase.byName(fakeDataBase[1].name)

    expect(department).toEqual(right(fakeDataBase[1]));
  });

  test('Should not find a unexistent department by email', async () => {
    const result = await findDepartmentUseCase.byName('UNEXISTENT')

    expect(result).toEqual(left(new NoResultError('UNEXISTENT')));
  });
})