import { SpyDepartmentRepository } from "./spy-department-repository";

const fakeDepartmentsDatabase = [
  {
    name: 'technology',
    managerEmail: 'marcos@bugmail.com', 
  },
  {
    name: 'administration',
    managerEmail: 'maria@bugmail.com', 
  },
]


//
describe('SpyDepartmentRepository validator', () => {
   test('Should return all departments in the repository', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);

    const departments = await spyDepartmentRepository.findAllDepartments();

    expect(departments).toEqual(fakeDepartmentsDatabase)

  });
  
  test('Should return department by email', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    expect(await spyDepartmentRepository.findDepartmentByManagerEmail(fakeDepartmentsDatabase[1].managerEmail))
      .toEqual(fakeDepartmentsDatabase[1]);
  });
  
  test('Should return null if email was not found', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    expect(await spyDepartmentRepository.findDepartmentByManagerEmail('thisEmailDoesNotExists@bugmai.com'))
      .toBe(null);
  });
  
  test('Should return true for existent department', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);

    expect(await spyDepartmentRepository.exists(fakeDepartmentsDatabase[1].name))
      .toBe(true);
  });
  
  test('Should return false for unexistent department', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    expect(await spyDepartmentRepository.exists('thisEmailDoesNotExists@bugmai.com'))
      .toBe(false);
  });
  
  test('Should add new department to fake database', async () => {
    const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);
    const newDepartment = {
      name: 'Jeraldo',
      managerEmail: 'montes@bugmail.com', 
    }

    await spyDepartmentRepository.add(newDepartment);

    expect(await spyDepartmentRepository.exists(newDepartment.name))
      .toBe(true);
  });
})