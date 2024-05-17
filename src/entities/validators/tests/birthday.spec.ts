import { Birthday } from "../birthday";

describe('Birthday validator', () => {
  test('Should accept valid date (valid classes)', () => {
    expect(Birthday.validate('2002-02-26')).toBe(true);
    expect(Birthday.validate('2002/02/26')).toBe(true);
  });

  test('Should not accept invalid date', () => {
    expect(Birthday.validate('')).toBe(false);
    expect(Birthday.validate('20d84545')).toBe(false);
  });

  test('Should not accept a birhday of too young person', () => {
    expect(Birthday.validate('2007-02-26')).toBe(false);
  });

})