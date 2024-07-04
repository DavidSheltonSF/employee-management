import { Role } from "./role";

describe('Role Validator', () => {
  test('Should create valid role (valid classes)', () =>{

    const roleData = {
      name: 'developer',
      department: 'technology'
    }
    const roleOrError = Role.create(roleData);
    expect(roleOrError.isRight()).toBe(true);
  });

  test('Should not create role with invalid name', ()=> {

    const roleData = {
      name: 'developer32#',
      department: 'technology',
    }

    const roleOrError = Role.create(roleData);
    expect(roleOrError.isLeft()).toBe(true);
  });

  test('Should not create role with invalid department', ()=> {

    const roleData = {
      name: 'developer',
      department: 'technology32#'
    }

    const roleOrError = Role.create(roleData);
    expect(roleOrError.isLeft()).toBe(true);
  });
});