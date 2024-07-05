import { mongoHelper } from "./helpers/mongo-helper"
import { MongodbRoleRepository } from "./mongodb-role-repository";
import {config} from 'dotenv'

config()

const repository = new MongodbRoleRepository();


describe('MongodbRoleRepository validator', () => {
  
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI){
      await mongoHelper.connect(MONGO_URI)
    } else {
      console.log('NO URI');
    }
      
  }, 60000);
  
  afterAll(async () => {
    await mongoHelper.disconnect();

  });

  
  beforeEach(async () => {
    await mongoHelper.clearCollection('roles');
  });


  test('Should return all roles in the database', async () => {

    const roles = [
      {
        name: 'assistant',
        department: 'technology',
      },
      {
        name: 'manager',
        department: 'Jon',
      }
    ]

    // Adding new roles to database
    await repository.add(roles[0])
    await repository.add(roles[1])

    const allRoles = await repository.findAllRoles();
    
    expect(allRoles[0].name).toEqual(roles[0].name);
    expect(allRoles[1].name).toEqual(roles[1].name);
  });

  
  test('Should return a single role by name from the database', async () => {

    const repository = new MongodbRoleRepository();

    const roles = [
      {
        name: 'assistant',
        department: 'technology',
      },
      {
        name: 'manager',
        department: 'Jon',
      }
    ]

    // Adding new roles to database
    
    await repository.add(roles[0])
    await repository.add(roles[1])

    const role = await repository.findRoleByName(roles[1].name);
    
    expect(role?.name).toEqual(roles[1].name)
    expect(role?.department).toEqual(roles[1].department)
  });
  
  test('Should add role', async () => {

    const newRole = {
      name: 'newRole',
      department: 'department'
    }

    await repository.add(newRole);

    const addedDepertment = await repository.findRoleByName(newRole.name);

    expect(addedDepertment?.name).toEqual(newRole.name)
    expect(addedDepertment?.department).toEqual(newRole.department)
  });
  
  test('Should update role', async () => {

    const newRole = {
      name: 'newRoleToUpdate',
      department: 'depart',
    }

    await repository.add(newRole);

    await repository.update('newRoleToUpdate', {
      name: 'UPDATED',
      department: 'depart',
    });

    const updatedRole = await repository.findRoleByName('UPDATED');

    expect(updatedRole?.name).toEqual('UPDATED');

  });
  
  test('Should remove a role from the database', async () => {

    const newRole1 = {
      name: 'Jeron',
      department: 'deoart',
    }

    const newRole2 = {
      name: 'Carla',
      department: 'department',
    }

    // Adding new roles to database
    
    await repository.add(newRole1);
    await repository.add(newRole2);

    // Deleting the second role
    await repository.delete(newRole2.name);

    // Checking if role was deleted
    const removedRole = await repository.findRoleByName(newRole2.name);
    expect(removedRole).toBe(null);
  });
})

