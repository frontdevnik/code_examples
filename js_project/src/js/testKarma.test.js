import checkTitle from './testKarma.js';

describe('Function checkTitle:', () => {
  describe('Should return true:', () => {
    it('Result', () => {
      expect(checkTitle('Title')).toBe(true);
    });
  });
});