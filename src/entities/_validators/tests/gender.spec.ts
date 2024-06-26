import { Gender } from "../gender";

describe('Gender validator', () => {
  test('Should accept valid gender (valid classes)', () => {
    expect(Gender.validate('male')).toBe(true);
    expect(Gender.validate('female')).toBe(true);
  });
  
  test('Should not accept valid gender if it is not lowercase', () => {
    expect(Gender.validate('MALE')).toBe(false);
    expect(Gender.validate('FEMALE')).toBe(false);
    expect(Gender.validate('Male')).toBe(false);
    expect(Gender.validate('Female')).toBe(false);
    expect(Gender.validate('MaLe')).toBe(false);
    expect(Gender.validate('FeMaLe')).toBe(false);
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