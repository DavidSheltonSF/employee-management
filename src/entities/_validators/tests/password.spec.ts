import { Password } from "../password";

describe('Password validator', () =>{
  test('Should accept valid password (valid classes)', () => {
    expect(Password.valitate('david123')).toBe(true);
    expect(Password.valitate('marcos@*Zeroinho')).toBe(true);
  });

  test('Should not accept password with length less than 6', () => {
    expect(Password.valitate('')).toBe(false);
    expect(Password.valitate('david')).toBe(false);
  });

  test('Should not accept password with length greather than 255', () => {
    let tooLongPassword = '';
    for(let i = 0; i < 256; i++){
      tooLongPassword += '1';
    }
    expect(Password.valitate(tooLongPassword)).toBe(false);

  });
})