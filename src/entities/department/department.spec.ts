import { Department } from "./department";
import { left, right } from "../../shared/either";
import { InvalidNameError} from "../_errors";

describe('Department Validator', () => {
  test('Should create valid department (valid classes)', () =>{

    const departmentData = {
      name: 'David',
      managerId: 'm1245324fdsf4sddsca',
    }
    const departmentOrError = Department.create(departmentData);
    expect(departmentOrError.isRight()).toBe(true);
  });

  test('Should not create department with invalid name', ()=> {

    const departmentData = {
      name: 'invalid@Department$%¨$¨%@',
      managerId: 'm1245324fdsf4sddsca',
    }

    const departmentOrError = Department.create(departmentData);
    expect(departmentOrError).toEqual(left(new InvalidNameError(departmentData.name)));

  });

});