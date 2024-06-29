import { SpyDepartmentRepository } from "./spy-department-repository";

const fakeDataBase = [
  {
    name: 'technology',
    managerEmail: 'marcos@bugmail.com', 
  },
  {
    name: 'administration',
    managerEmail: 'maria@bugmail.com', 
  },
]

describe('SpyDepartmentRepository validator', () => {

   test('Should return all departments in the repository', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);

    const departments = await spyDepartmentRepository.findAllDepartments();

    expect(departments).toEqual(fakeDataBase)

  });
  
  
  test('Should return true for an existent department', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);

    expect(await spyDepartmentRepository.exists(fakeDataBase[1].name))
      .toBe(true);
  });
  
  test('Should return false for unexistent department', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    expect(await spyDepartmentRepository.exists('thisEmailDoesNotExists@bugmai.com'))
      .toBe(false);
  });
  
  test('Should add new department to fake database', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDataBase);
    const newDepartment = {
      name: 'Jeraldo',
      managerEmail: 'montes@bugmail.com', 
    }

    await spyDepartmentRepository.add(newDepartment);

    expect(await spyDepartmentRepository.exists(newDepartment.name))
      .toBe(true);
  });
})