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
      
  }, 60000);
  

  afterAll(async () => {
    await mongoHelper.disconnect();

  });

  
  beforeEach(async () => {
    await mongoHelper.clearCollection('departments');
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
    
    expect(allDepartments[0].name).toEqual(departments[0].name);
    expect(allDepartments[1].name).toEqual(departments[1].name);
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
  
  test('Should add department', async () => {

    const newDepartment = {
      name: 'department1',
      managerEmail: 'dane@bugmail.com',
    }

    await repository.add(newDepartment);

    const addedDepertment = await repository.findDepartmentByName(newDepartment.name);

    expect(addedDepertment?.name).toEqual(newDepartment.name)
    expect(addedDepertment?.managerEmail).toEqual(newDepartment.managerEmail)
  });
  
  test('Should update department', async () => {

    const newDepartment = {
      name: 'administration',
      managerEmail: 'joao@bugmail.com',
    }

    await repository.add(newDepartment);

    await repository.update('administration', {
      name: 'administration',
      managerEmail: 'thamires@bugmail.com',
    });

    const updatedDepartment = await repository.findDepartmentByName(newDepartment.name);

    expect(updatedDepartment?.managerEmail).toEqual('thamires@bugmail.com');

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
  
})