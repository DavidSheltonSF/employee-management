import { SpyDepartmentRepository } from "./spy-department-repository";

const fakeDepartmentsDatabase = [
  {
    name: 'Marcos',
    managerEmail: 'marcos@bugmail.com', 
  },
  {
    name: 'Maria',
    managerEmail: 'maria@bugmail.com', 
  },
]

const spyDepartmentRepository = new SpyDepartmentRepository(fakeDepartmentsDatabase);

describe('SpyDepartmentRepository validator', () => {
   test('Should return all departments in the repository', async () => {
    expect(await spyDepartmentRepository.findAllDepartments()).toEqual([
      {
        name: 'Marcos',
        managerEmail: 'marcos@bugmail.com', 
      },
      {
        name: 'Maria',
        managerEmail: 'maria@bugmail.com', 
      },
    ])

  });

  test('Should return department by email', async () => {

    expect(await spyDepartmentRepository.findDepartmentByManagerEmail(fakeDepartmentsDatabase[1].managerEmail))
      .toEqual(fakeDepartmentsDatabase[1]);
  });

  test('Should return null if email was not found', async () => {

    expect(await spyDepartmentRepository.findDepartmentByManagerEmail('thisEmailDoesNotExists@bugmai.com'))
      .toBe(null);
  });

  test('Should return true for existent department', async () => {
    expect(await spyDepartmentRepository.exists(fakeDepartmentsDatabase[1].managerEmail))
      .toBe(true);
  });

  test('Should return false for unexistent department', async () => {
    expect(await spyDepartmentRepository.exists('thisEmailDoesNotExists@bugmai.com'))
      .toBe(false);
  });

  test('Should add new department to fake database', async () => {
    const newDepartment = {
      name: 'Jeraldo',
      managerEmail: 'montes@bugmail.com', 
    }

    await spyDepartmentRepository.add(newDepartment);

    expect(await spyDepartmentRepository.exists(newDepartment.managerEmail))
      .toBe(true);
  });

})