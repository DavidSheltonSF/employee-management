import { mongoHelper } from "./helpers/mongo-helper"
import { MongodbEmployeeRepository } from "./mongodb-employee-repository";
import {config} from 'dotenv'

config()

const repository = new MongodbEmployeeRepository();

describe('MongodbEmployeeRepository validator', () => {
  
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
    await mongoHelper.clearCollection('employees');
  });
  
  test('Should return all employees in the database', async () => {

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
    await repository.add(employees[0]);
    await repository.add(employees[1]);

    const allEmployees = await repository.findAllEmployees();
    
    expect(allEmployees[0].name).toEqual(employees[0].name);
    expect(allEmployees[1].name).toEqual(employees[1].name);
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
    
    await repository.add(employees[0]);
    await repository.add(employees[1]);

    const employee = await repository.findEmployeeByEmail(employees[1].email);
    
    expect(employee?.name).toEqual(employees[1].name);
    expect(employee?.lastName).toEqual(employees[1].lastName);
    expect(employee?.birthday).toEqual(employees[1].birthday);
    expect(employee?.department).toEqual(employees[1].department);
    expect(employee?.email).toEqual(employees[1].email);
    expect(employee?.gender).toEqual(employees[1].gender);
    expect(employee?.role).toEqual(employees[1].role);
  });
  
  test('Should add employee', async () => {

    const newEmployee = {
      name: 'newEmploee',
      lastName: 'new',
      email: 'newton@bugmail.com',
      birthday: '2001-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    await repository.add(newEmployee);

    const addedDepertment = await repository.findEmployeeByEmail(newEmployee.email);

    expect(addedDepertment?.name).toEqual(newEmployee.name);
    expect(addedDepertment?.lastName).toEqual(newEmployee.lastName);
    expect(addedDepertment?.birthday).toEqual(newEmployee.birthday);
    expect(addedDepertment?.department).toEqual(newEmployee.department);
    expect(addedDepertment?.email).toEqual(newEmployee.email);
    expect(addedDepertment?.gender).toEqual(newEmployee.gender);
    expect(addedDepertment?.role).toEqual(newEmployee.role);
  });
  
  test('Should update employee', async () => {

    const newEmployee = {
      name: 'newEmploee',
      lastName: 'new',
      email: 'newton@bugmail.com',
      birthday: '2001-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    await repository.add(newEmployee);

    await repository.update('newton@bugmail.com', {
      name: 'UPDATED',
      lastName: 'new',
      email: 'newton@bugmail.com',
      birthday: '2001-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    });

    const updatedEmployee = await repository.findEmployeeByEmail('newton@bugmail.com');
    
    expect(updatedEmployee?.name).toEqual('UPDATED');
    expect(updatedEmployee?.lastName).toEqual(newEmployee.lastName);
    expect(updatedEmployee?.birthday).toEqual(newEmployee.birthday);
    expect(updatedEmployee?.department).toEqual(newEmployee.department);
    expect(updatedEmployee?.email).toEqual(newEmployee.email);
    expect(updatedEmployee?.gender).toEqual(newEmployee.gender);
    expect(updatedEmployee?.role).toEqual(newEmployee.role);

  });
  
  test('Should remove a employee from the database', async () => {

    const newEmployee1 = {
      name: 'Ricard',
      lastName: 'Matos',
      email: 'ricard@bugmail.com',
      birthday: '2001-02-05',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    const newEmployee2 = {
      name: 'Jorel',
      lastName: 'Vitor',
      email: 'jorel@bugmail.com',
      birthday: '2002-02-15',
      gender: 'male',
      role: 'developer',
      department: 'technology'
    }

    // Adding new employees to database
    
    await repository.add(newEmployee1);
    await repository.add(newEmployee2);


    // Deleting the second employee
    await repository.delete(newEmployee2.email);

    // Checking if employee was deleted
    const removedEmployee = await repository.findEmployeeByEmail(newEmployee2.email);
    expect(removedEmployee).toBe(null);
  });
  
})