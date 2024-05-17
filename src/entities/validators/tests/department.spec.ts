import { Department } from "../department";

describe('Department validator', () => {
  test('Should accept valid department (valid classes)', () => {
    expect(Department.validate('customer_service')).toBe(true);
    expect(Department.validate('administrative')).toBe(true);
    expect(Department.validate('cleaning')).toBe(true);
  });

  test('Should accept valid department values regardless if the value is lowercase, uppercase, etc', () => {
    expect(Department.validate('CUSTOMER_SERVICE')).toBe(true);
    expect(Department.validate('ADMINISTRATIVE')).toBe(true);
    expect(Department.validate('CLEANING')).toBe(true);
    expect(Department.validate('CUSTOMER_service')).toBe(true);
    expect(Department.validate('AdMinistrative')).toBe(true);
    expect(Department.validate('Cleaning')).toBe(true);
  });

  test('Should not accept invalid values', ()=>{
    expect(Department.validate('')).toBe(true);
    expect(Department.validate('custumer_serv')).toBe(true);
    expect(Department.validate('Cleaning23')).toBe(true);
  })
})