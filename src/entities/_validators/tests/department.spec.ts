import { Department } from "../department";

describe('Department validator', () => {
  test('Should accept valid department (valid classes)', () => {
    expect(Department.validate('customer_service')).toBe(true);
    expect(Department.validate('administrative')).toBe(true);
    expect(Department.validate('cleaning')).toBe(true);
  });

  test('Should not accept valid department values if it is not lowercase', () => {
    expect(Department.validate('CUSTOMER_SERVICE')).toBe(false);
    expect(Department.validate('CUSTOMER_service')).toBe(false);
    expect(Department.validate('AdMinistrative')).toBe(false);
    expect(Department.validate('Cleaning')).toBe(false);
  });

  test('Should not accept invalid values', ()=>{
    expect(Department.validate('')).toBe(false);
    expect(Department.validate('custumer serv')).toBe(false);
    expect(Department.validate('custumer**serv')).toBe(false);
    expect(Department.validate('Cleaning23')).toBe(false);
  })
  //
})