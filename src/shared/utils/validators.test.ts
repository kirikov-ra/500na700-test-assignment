import { describe, it, expect } from 'vitest';
import { isValidEmail, formatPhoneMask } from './validators';

describe('Validators Utility', () => {
  it('isValidEmail должен правильно валидировать email', () => {
    expect(isValidEmail('test@mail.ru')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@.com')).toBe(false);
  });

  it('formatPhoneMask должен форматировать строку цифр в маску РФ', () => {
    expect(formatPhoneMask('9991234455')).toBe('+7 (999) 123-44-55');
    expect(formatPhoneMask('89991234455')).toBe('+7 (999) 123-44-55');
  });
});
