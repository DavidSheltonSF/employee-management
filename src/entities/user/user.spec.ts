import { User } from "./user";

describe('User Validator', () => {
  test('Should create valid user (valid classes)', () =>{

    const userData = {
      name: 'David',
      lastName: 'Shelton',
      email: 'david@bugmail.com',
      userRole: 'admin',
      password: 'david123456'
    }
    const userOrError = User.create(userData);
    expect(userOrError.isRight()).toBe(true);
  });

  test('Should not create user with invalid name', ()=> {

    const userData = {
      name: 'David32#',
      lastName: 'Shelton',
      email: 'david@bugmail.com',
      userRole: 'admin',
      password: 'david123456'
    }

    const userOrError = User.create(userData);
    expect(userOrError.isLeft()).toBe(true);

  });

  test('Should not create user with invalid LAST NAME', ()=> {

    const userData = {
      name: 'David',
      lastName: 'Shelton32#',
      email: 'david@bugmail.com',
      userRole: 'admin',
      password: 'david123456'
    }

    const userOrError = User.create(userData);
    expect(userOrError.isLeft()).toBe(true);

  });

  test('Should not create user with invalid e-mail', ()=> {

    const userData = {
      name: 'David',
      lastName: 'Shelton',
      email: 'david@bugmail*&&¨&',
      userRole: 'admin',
      password: 'david123456'
    }

    const userOrError = User.create(userData);
    expect(userOrError.isLeft()).toBe(true);

  });

});