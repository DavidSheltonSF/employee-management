import { mongoHelper } from "./helpers/mongo-helper"
import { MongodbUserRepository } from "./mongodb-user-repository";
import {config} from 'dotenv'

config()

const repository = new MongodbUserRepository();

describe('MongodbUserRepository validator', () => {
  
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
    await mongoHelper.clearCollection('users');
  });


  test('Should return all users in the database', async () => {

    const users = [
      {
        name: 'Marta',
        lastName: 'Jon',
        email: 'mart@bugmail.com',
        userRole: 'viewer',
        password: 'marta123'
      },
      {
        name: 'Carlos',
        lastName: 'Jon',
        email: 'carlos@bugmail.com',
        userRole: 'viewer',
        password: 'carlos123'
      }
    ]

    // Adding new users to database
    await repository.add(users[0])
    await repository.add(users[1])

    const allUsers = await repository.findAllUsers();
    
    expect(allUsers[0].name).toEqual(users[0].name);
    expect(allUsers[1].name).toEqual(users[1].name);
  });

  
  test('Should return a single user by email from the database', async () => {

    const repository = new MongodbUserRepository();

    const users = [
      {
        name: 'Marta',
        lastName: 'Jon',
        email: 'mart@bugmail.com',
        userRole: 'viewer',
        password: 'marta123'
      },
      {
        name: 'Carlos',
        lastName: 'Jon',
        email: 'carlos@bugmail.com',
        userRole: 'viewer',
        password: 'carlos123'
      }
    ]

    // Adding new users to database
    
    await repository.add(users[0])
    await repository.add(users[1])

    const user = await repository.findUserByEmail(users[1].email);
    
    expect(user?.name).toEqual(users[1].name)
    expect(user?.lastName).toEqual(users[1].lastName)
    expect(user?.email).toEqual(users[1].email)
    expect(user?.password).toEqual(users[1].password)
    expect(user?.userRole).toEqual(users[1].userRole)
  });
  
  test('Should add user', async () => {

    const newUser = {
      name: 'newUser',
      lastName: 'Jon',
      email: 'new@bugmail.com',
      userRole: 'viewer',
      password: 'new123'
    }

    await repository.add(newUser);

    const addedDepertment = await repository.findUserByEmail(newUser.email);

    expect(addedDepertment?.name).toEqual(newUser.name)
    expect(addedDepertment?.lastName).toEqual(newUser.lastName)
    expect(addedDepertment?.email).toEqual(newUser.email)
    expect(addedDepertment?.password).toEqual(newUser.password)
    expect(addedDepertment?.userRole).toEqual(newUser.userRole)
  });
  
  test('Should update user', async () => {

    const newUser = {
      name: 'newUser',
      lastName: 'JonwIKI',
      email: 'new@bugmail.com',
      userRole: 'viewer',
      password: 'new123'
    }

    await repository.add(newUser);

    await repository.update('new@bugmail.com', {
      name: 'UPDATED',
      lastName: 'JonwIKI',
      email: 'new@bugmail.com',
      userRole: 'viewer',
      password: 'new123'
    });

    const updatedUser = await repository.findUserByEmail(newUser.email);

    expect(updatedUser?.name).toEqual('UPDATED');

  });
  
  test('Should remove a user from the database', async () => {

    const newUser1 = {
      name: 'Jeron',
      lastName: 'Jon',
      email: 'jeron@bugmail.com',
      userRole: 'viewer',
      password: 'jj123'
    }

    const newUser2 = {
      name: 'Carla',
      lastName: 'Carmo',
      email: 'carla@bugmail.com',
      userRole: 'viewer',
      password: 'car123'
    }

    // Adding new users to database
    
    await repository.add(newUser1);
    await repository.add(newUser2);

    // Deleting the second user
    await repository.delete(newUser2.email);

    // Checking if user was deleted
    const removedUser = await repository.findUserByEmail(newUser2.email);
    expect(removedUser).toBe(null);
  });
  
})

