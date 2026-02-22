export const isValidEmail = (email: string): boolean => {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(email);
};

export const formatPhoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  let result = '';

  if (!numbers) return result;

  const cleanNumbers =
    numbers[0] === '7' || numbers[0] === '8' ? numbers.slice(1) : numbers;

  result = '+7';
  if (cleanNumbers.length > 0) result += ` (${cleanNumbers.substring(0, 3)}`;
  if (cleanNumbers.length >= 4) result += `) ${cleanNumbers.substring(3, 6)}`;
  if (cleanNumbers.length >= 7) result += `-${cleanNumbers.substring(6, 8)}`;
  if (cleanNumbers.length >= 9) result += `-${cleanNumbers.substring(8, 10)}`;

  return result;
};
