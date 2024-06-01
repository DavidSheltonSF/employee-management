
import { mongoHelper } from "./hepers/mongo-helper"
import { MongodbEmployeeRepository } from "./mongodb-employee-repository";
import {config} from 'dotenv'

config()

describe('MongodbEmployeeRepository validator', () => {
  
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
    mongoHelper.clearCollection('employees');

  });

  
  beforeEach(async () => {

    mongoHelper.clearCollection('employees');
  });
  
  
  test('Should add employee', async () => {

    const repository = new MongodbEmployeeRepository();

    const newEmployee = {
      name: 'Jeronimo',
      lastName: 'Jero',
      email: 'jero@bugmail.com',
      birthday: '2000-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    const exists = await repository.exists(newEmployee.email)

    if (exists){
      await repository.add(newEmployee);
    }

  });

  test('Should update employee', async () => {

    const repository = new MongodbEmployeeRepository();

    const newEmployee = {
      name: 'Jeronimo',
      lastName: 'Jero',
      email: 'jero@bugmail.com',
      birthday: '2000-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    await repository.add(newEmployee);

    await repository.update({
      name: 'Jeronimo',
      lastName: 'Michael',
      email: 'jero@bugmail.com',
      birthday: '2000-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    });

    const updatedEmployee = await repository.findEmployeeByEmail(newEmployee.email);

    expect(updatedEmployee?.lastName).toEqual('Michael');

});
  
  test('Should remove a employee from the database', async () => {
    const repository = new MongodbEmployeeRepository();

    const newEmployee1 = {
      name: 'Jeronimo',
      lastName: 'Jero',
      email: 'jero@bugmail.com',
      birthday: '2000-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    const newEmployee2 = {
      name: 'Thomas',
      lastName: 'Tom',
      email: 'tom@bugmail.com',
      birthday: '2001-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    // Adding new employees to database
    const exists1 = await repository.exists(newEmployee1.email);
    if (!exists1){
      await repository.add(newEmployee1)
    }

    const exists2 = await repository.exists(newEmployee2.email);
    if (!exists2){
      await repository.add(newEmployee2)
    }

    // Deleting employee
    await repository.delete(newEmployee2.email);

    // Checking if employee was deleted
    const removedEmployee = await repository.findEmployeeByEmail(newEmployee2.email);
    expect(removedEmployee).toBe(null)
  });
  
  test('Should return all employees in the database', async () => {

    const repository = new MongodbEmployeeRepository();

    const employees = [
      {
        name: 'Jeronimo',
        lastName: 'Jero',
        email: 'jero@bugmail.com',
        birthday: '2000-02-05',
        gender: 'male',
        role: 'developer',
        department: 'technology'
      },
      {
        name: 'Thomas',
        lastName: 'Tom',
        email: 'tom@bugmail.com',
        birthday: '2001-02-05',
        gender: 'male',
        role: 'developer',
        department: 'technology'
      }
    ]

    // Adding new employees to database
    
    await repository.add(employees[0])
    await repository.add(employees[1])

    const allEmployees = await repository.findAllEmployees();
    
    expect(allEmployees[0].email).toEqual(employees[0].email);
    expect(allEmployees[1].email).toEqual(employees[1].email);
  });

  test('Should return a single employee by email from the database', async () => {

    const repository = new MongodbEmployeeRepository();

    const employees = [
      {
        name: 'Jeronimo',
        lastName: 'Jero',
        email: 'jero@bugmail.com',
        birthday: '2000-02-05',
        gender: 'male',
        role: 'developer',
        department: 'technology'
      },
      {
        name: 'Thomas',
        lastName: 'Tom',
        email: 'tom@bugmail.com',
        birthday: '2001-02-05',
        gender: 'male',
        role: 'developer',
        department: 'technology'
      }
    ]

    // Adding new employees to database
    
    await repository.add(employees[0])
    await repository.add(employees[1])

    const employee = await repository.findEmployeeByEmail(employees[1].email);
    
    expect(employee?.email).toEqual(employees[1].email);
  });
  

})