import { UserRole } from "../userRole";

describe('UserRole validator', () => {
  test('Should accept valid user role (valid classes)', () => {
    expect(UserRole.validate('admin')).toBe(true);
    expect(UserRole.validate('manager')).toBe(true);
    expect(UserRole.validate('employee')).toBe(true);
    expect(UserRole.validate('viewer')).toBe(true);
  });

  test('Should not accept void value', () => {
    expect(UserRole.validate('')).toBe(false);
  });

  test('Should not accept invalid roles', ()=> {
    expect(UserRole.validate('invalidRole')).toBe(false);
    expect(UserRole.validate('admin52')).toBe(false);
    expect(UserRole.validate('1manager')).toBe(false);
    expect(UserRole.validate('viewer24')).toBe(false);
  });
})