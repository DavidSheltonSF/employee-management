import { Name } from "../name";

describe('Name validator', ()=> {
  test('Should accept valid name (valid classes)', () => {
    expect(Name.validate('David')).toBe(true);
  });

  test('Should accept valid  name with accentuation (valid classes)', () => {
    expect(Name.validate('José')).toBe(true);
  });
  
  test('Should not accept name with any special characters', () => {
    expect(Name.validate('David@')).toBe(false);
  });

  test('Should not accept name with any numbers', () => {
    expect(Name.validate('David1')).toBe(false);
  });

  test('Should not accept name with just one character', () => {
    expect(Name.validate('D')).toBe(false);
  });

  test('Should not accept name with more than 255 characters', () => {
    let invalidName = '';
    for (let i = 0; i < 256; i++){
      invalidName += 'D';
    }
    expect(Name.validate(invalidName)).toBe(false);
  });
})