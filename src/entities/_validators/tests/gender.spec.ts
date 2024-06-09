import { Gender } from "../gender";

describe('Gender validator', () => {
  test('Should accept valid gender (valid classes)', () => {
    expect(Gender.validate('male')).toBe(true);
    expect(Gender.validate('female')).toBe(true);
  });

  test('Should accept valid gender regardless if value is uppercase, lowercase, etc.', () => {
    expect(Gender.validate('MALE')).toBe(true);
    expect(Gender.validate('FEMALE')).toBe(true);
    expect(Gender.validate('Male')).toBe(true);
    expect(Gender.validate('Female')).toBe(true);
    expect(Gender.validate('MaLe')).toBe(true);
    expect(Gender.validate('FeMaLe')).toBe(true);
  })

  test('Should not accept invalid gender value', () => {
    expect(Gender.validate('male4')).toBe(false);
    expect(Gender.validate('2female')).toBe(false);
    expect(Gender.validate('banana')).toBe(false);

  });

  test('Should not accept void value', () => {
    expect(Gender.validate('')).toBe(false);
  });
})