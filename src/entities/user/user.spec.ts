import { User } from "./user";
import { left } from "../../shared/either";
import { InvalidNameError, InvalidEmailError, InvalidGenderError } from "../errors";

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
    expect(userOrError).toEqual(User.create(userData));
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
    expect(userOrError).toEqual(left(new InvalidNameError(userData.name)));

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
    expect(userOrError).toEqual(left(new InvalidNameError(userData.lastName)));

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
    expect(userOrError).toEqual(left(new InvalidEmailError(userData.email)));

  });

});