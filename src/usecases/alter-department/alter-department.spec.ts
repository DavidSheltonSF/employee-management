import { AlterDepartment } from "./alter-department";
import { SpyDepartmentRepository } from "../_in-memory-department-repository/spy-department-repository";
import { left } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";

const fakeDataBase = [
  {
    name: 'rh',
    managerEmail: 'jeraldo@bugmail.com', 
  },
  {
    name: 'technology',
    managerEmail: 'arnold@bugmail.com', 
  },
]

describe('alterDepartment validator', () => {

  test('Should alter Department correctly', async () => {

    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    const alterDepartmentUseCase = new AlterDepartment(spyDepartmentRepository);

    const response = await alterDepartmentUseCase.alter({
      name: 'technology',
      managerEmail: 'ana@bugmail.com', 
    });

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy()

    // Checking if params were added to the spy correctly
    expect(spyDepartmentRepository.updateParams['departmentData'])
    .toEqual({
      name: 'technology',
      managerEmail: 'ana@bugmail.com', 
    });
  });
  
  test('Should return NoResultError for a not registered email', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    const alterDepartmentUseCase = new AlterDepartment(spyDepartmentRepository);

    const unexistentDepartment = {
      name: 'unexistent',
      managerEmail: 'unexistent@bugmail.com', 
    }

    const response = await alterDepartmentUseCase.alter(unexistentDepartment);

    expect(response).toEqual(left(new NoResultError(unexistentDepartment.name)));
  })
  
})