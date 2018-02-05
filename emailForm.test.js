import {
  verifyEmail,
  handleSubmit,
  update,
  validMsg
} from './emailForm';
import React from 'react';

describe('verifyEmail', () => {
  describe('when given a proper email', () => {
    it('returns true', () => {
      const email1 = 'andrew@gmail.com';
      const email2 = 'jbutler8@terpmail.umd.edu';
      const email3 = 'THIS_GUY@EMAIL.EDU';

      expect(verifyEmail(email1)).toBe(true);
      expect(verifyEmail(email2)).toBe(true);
      expect(verifyEmail(email3)).toBe(true);
    });
  });

  describe('when given an invalid email', () => {
    it('returns false', () => {
      const email1 = 'jacob';
      const email2 = 'jacob@';
      const email3 = 'jacob@ubuntu';
      const email4 = 'jacob@gmail.';
      const email5 = 'jacob.gmail.com';
      const email6 = 'jacob@gmail@umd.edu';
      const email7 = 'this@email.could.go.on.forever';

      expect(verifyEmail(email1)).toBe(false);
      expect(verifyEmail(email2)).toBe(false);
      expect(verifyEmail(email3)).toBe(false);
      expect(verifyEmail(email4)).toBe(false);
      expect(verifyEmail(email5)).toBe(false);
      expect(verifyEmail(email6)).toBe(false);
      expect(verifyEmail(email7)).toBe(false);
    });
  });
});
