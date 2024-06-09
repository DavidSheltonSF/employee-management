import { Email } from "../email";

describe('Email validator', () => {
  test('Should accept valid email (valid classes)', () => {
    expect(Email.validate('david@bugmail.com')).toBe(true);
  });

  test('Should not accept email without "@"', () => {
    expect(Email.validate('davidbugmail.com')).toBe(false);
  })

  test('Should not accept email with more than 255 characters', () => {
    let tooLongEmail = 'david@bugmail.com';
    for (let i = 0; i < 256; i++){
      tooLongEmail += 'm';
    }
    expect(Email.validate(tooLongEmail)).toBe(false);
  });
})