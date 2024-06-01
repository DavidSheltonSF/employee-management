
import { mongoHelper } from "./hepers/mongo-helper"
import { MongodbUserRepository } from "./mongodb-user-repository";
import {config} from 'dotenv'

config()

describe('MongodbUserRepository validator', () => {
  
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI){
      await mongoHelper.connect(MONGO_URI)
    } else {
      console.log('NO URI')
    }
      
  });
  
  afterAll(async () => {
    await mongoHelper.disconnect();
    mongoHelper.clearCollection('users');

  });

  
  beforeEach(async () => {

    mongoHelper.clearCollection('users');
  });
  
  
  test('Should add user', async () => {

    const repository = new MongodbUserRepository();

    const newUser = {
      name: 'Jeronimo',
      lastName: 'Jero',
      email: 'jero@bugmail.com',
      userRole: 'viewer',
      password: 'jero123'
    }

    const exists = await repository.exists(newUser.email)

    if (exists){
      await repository.add(newUser);
    }

  });

  test('Should update user', async () => {

    const repository = new MongodbUserRepository();

    const newUser = {
      name: 'Jeronimo',
      lastName: 'Jero',
      email: 'jero@bugmail.com',
      userRole: 'viewer',
      password: 'jero123'
    }

    await repository.add(newUser);

    await repository.update({
      name: 'Jeronimo',
      lastName: 'Michael',
      email: 'jero@bugmail.com',
      userRole: 'viewer',
      password: 'jero123'
    });

    const updatedUser = await repository.findUserByEmail(newUser.email);

    expect(updatedUser?.lastName).toEqual('Michael');

});
  
  test('Should remove a user from the database', async () => {
    const repository = new MongodbUserRepository();

    const newUser1 = {
      name: 'Tone',
      lastName: 'Tonio',
      email: 'ton@bugmail.com',
      userRole: 'viewer',
      password: 'tone123'
    }

    const newUser2 = {
      name: 'Ula',
      lastName: 'unio',
      email: 'ula@bugmail.com',
      userRole: 'viewer',
      password: 'ula123'
    }

    // Adding new users to database
    const exists1 = await repository.exists(newUser1.email);
    if (!exists1){
      await repository.add(newUser1)
    }

    const exists2 = await repository.exists(newUser2.email);
    if (!exists2){
      await repository.add(newUser2)
    }

    // Deleting user
    await repository.delete(newUser2.email);

    // Checking if user was deleted
    const removedUser = await repository.findUserByEmail(newUser2.email);
    expect(removedUser).toBe(null)
  });
  
  test('Should return all users in the database', async () => {

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

    const allUsers = await repository.findAllUsers();

    console.log(allUsers);
    
    expect(allUsers[0].email).toEqual(users[0].email);
    expect(allUsers[1].email).toEqual(users[1].email);
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
    
    expect(user?.email).toEqual(users[1].email);
  });
  

})