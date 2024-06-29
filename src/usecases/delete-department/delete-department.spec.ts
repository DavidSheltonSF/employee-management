import { DeleteDepartment } from "./delete-department";
import { SpyDepartmentRepository } from "../_in-memory-department-repository/spy-department-repository";
import { left } from "../../shared/either";
import { NoResultError } from "../_errors/no-result";


const fakeDataBase = [
  {
    name: 'administration',
    managerEmail: 'gabriel@bugmail.com', 
  },
  {
    name: 'technology',
    lastName: 'ana@bugmail.com', 
  }
]


describe('deleteDepartment validator', () => {

  test('Should delete Department correctly', async () => {
    const departmentToDelete = {
      name: 'technology',
      managerEmail: 'ana@bugmail.com', 
    }

    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    const deleteDepartmentUseCase = new DeleteDepartment(spyDepartmentRepository);
    
    const response = await deleteDepartmentUseCase.delete(departmentToDelete.name);

    // Checking if response of the usecase is right
    expect(response.isRight()).toBeTruthy();

    // Checking if params were added to the spy correctly
    expect(spyDepartmentRepository.deleteParams['name'])
    .toEqual(departmentToDelete.name);
  });

  test('Should return NoResultError for a not registered email', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    const deleteDepartmentUseCase = new DeleteDepartment(spyDepartmentRepository);

    const falseEmail = 'unexistentemail@bugmail.com'
    const response = await deleteDepartmentUseCase.delete(falseEmail);

    expect(response).toEqual(left(new NoResultError(falseEmail)));
  })
})