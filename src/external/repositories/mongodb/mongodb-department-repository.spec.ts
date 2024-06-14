
import { mongoHelper } from "./helpers/mongo-helper"
import { MongodbDepartmentRepository } from "./mongodb-department-repository";
import {config} from 'dotenv'

config()

const repository = new MongodbDepartmentRepository();

describe('MongodbDepartmentRepository validator', () => {
  
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI){
      await mongoHelper.connect(MONGO_URI)
    } else {
      console.log('NO URI')
    }
      
  }, 20000);
  
  afterAll(async () => {
    //mongoHelper.clearCollection('departments');
    await mongoHelper.disconnect();

  });

  
  beforeEach(async () => {
    mongoHelper.clearCollection('departments');
  });
  
  
  test('Should add department', async () => {

    const newDepartment = {
      name: 'department1',
      managerEmail: 'dane@bugmail.com',
    }

    await repository.add(newDepartment);

  });

  test('Should return all departments in the database', async () => {

    const departments = [
      {
        name: 'technology',
        managerEmail: 'mane@bugmail.com',
      },
      {
        name: 'administration',
        managerEmail: 'joao@bugmail.com',
      }
    ]

    // Adding new departments to database
    
    await repository.add(departments[0])
    await repository.add(departments[1])

    const allDepartments = await repository.findAllDepartments();

    console.log(allDepartments)
    
    expect(allDepartments[0].name).toEqual(departments[0].name);
    expect(allDepartments[1].name).toEqual(departments[1].name);
  }, 20000);
  
  test('Should update department', async () => {

    const newDepartment = {
      name: 'administration',
      managerEmail: 'joao@bugmail.com',
    }

    await repository.add(newDepartment);

    await repository.update({
      name: 'administration',
      managerEmail: 'tonia@bugmail.com',
    });

    const updatedDepartment = await repository.findDepartmentByName('administration');

    expect(updatedDepartment?.managerEmail).toEqual('tonia@bugmail.com');

  });
  
  test('Should remove a department from the database', async () => {

    const newDepartment1 = {
      name: 'technology',
      managerEmail: 'mane@bugmail.com',
    }

    const newDepartment2 = {
      name: 'administration',
      managerEmail: 'joao@bugmail.com',
    }

    // Adding new departments to database
    
    await repository.add(newDepartment1)
    await repository.add(newDepartment2)


    // Deleting the second department
    await repository.delete(newDepartment2.name);

    // Checking if department was deleted
    const removedDepartment = await repository.findDepartmentByName(newDepartment2.name);
    expect(removedDepartment).toBe(null)
  });
  
  
  
  test('Should return a single department by email from the database', async () => {

    const repository = new MongodbDepartmentRepository();

    const departments = [
      {
        name: 'technology',
        managerEmail: 'mane@bugmail.com',
      },
      {
        name: 'administration',
        managerEmail: 'joao@bugmail.com',
      }
    ]

    // Adding new departments to database
    
    await repository.add(departments[0])
    await repository.add(departments[1])

    const department = await repository.findDepartmentByName(departments[1].name);
    
    expect(department?.name).toEqual(departments[1].name);
  });

})