import { Name } from "../name";

describe('Name validator', ()=> {
  test('Should accept valid name (valid classes)', () => {
    expect(Name.validate('David')).toBe(true);
  });
  
  test('Should not accept name with special caracteres', () => {
    expect(Name.validate('David@')).toBe(false);
  })
})