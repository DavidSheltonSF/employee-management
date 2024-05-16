import { UserRole } from "../userRole";

describe('UserRole validator', () => {
  test('Should accept valid user role (valid classes)', () => {
    expect(UserRole.validate('admin')).toBe(true);
    expect(UserRole.validate('editor')).toBe(true);
    expect(UserRole.validate('viewer')).toBe(true);
  });

  test('Should accept valid user role regardless if the value is lowercase, uppercase, etc.', () => {
    expect(UserRole.validate('ADMIN')).toBe(true);
    expect(UserRole.validate('EDITOR')).toBe(true);
    expect(UserRole.validate('VIEWER')).toBe(true);
    expect(UserRole.validate('AdMin')).toBe(true);
    expect(UserRole.validate('EdItOr')).toBe(true);
    expect(UserRole.validate('ViEwEr')).toBe(true);

  });

  test('Should not accept void value', () => {
    expect(UserRole.validate('')).toBe(false);
  });

  test('Should not accept invalid roles', ()=> {
    expect(UserRole.validate('invalidRole')).toBe(false);
    expect(UserRole.validate('admin52')).toBe(false);
    expect(UserRole.validate('1editor')).toBe(false);
    expect(UserRole.validate('viewer24')).toBe(false);
  });
})