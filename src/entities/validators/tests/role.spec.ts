import { Role } from "../role";

describe('Role validator', () => {
  test('Should accept valid role (valid classes)', () => {
    expect(Role.validate('cashier')).toBe(true);
  });
  
  test('Should accept valid role regardless if value is lowercase, uppercase, etc.', () => {
    expect(Role.validate('CASHIER')).toBe(true);
    expect(Role.validate('PACKER')).toBe(true);
    expect(Role.validate('Packer')).toBe(true);
    expect(Role.validate('Cashier')).toBe(true);
  });
  
  test('Should not accept void values', () => {
    expect(Role.validate('')).toBe(false);
  });

  test('Should not accept invalid roles', () => {
    expect(Role.validate('banana')).toBe(false);
    expect(Role.validate('cashier24')).toBe(false);
  });
})