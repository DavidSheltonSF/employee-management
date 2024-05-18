import { Role } from "../role";

describe('Role validator', () => {
  test('Should accept valid role (valid classes)', () => {
    expect(Role.validate('cashier')).toBe(true);
    expect(Role.validate('administrative_assistant')).toBe(true);
  });
  
  test('Should not accept valid role if value is not lowercase.', () => {
    expect(Role.validate('CASHIER')).toBe(false);
    expect(Role.validate('PACKER')).toBe(false);
    expect(Role.validate('Packer')).toBe(false);
    expect(Role.validate('Cashier')).toBe(false);
  });
  
  test('Should not accept void values', () => {
    expect(Role.validate('')).toBe(false);
  });

  test('Should not accept invalid roles', () => {
    expect(Role.validate('administrative assistant')).toBe(false);
    expect(Role.validate('cashier24')).toBe(false);
  });
})