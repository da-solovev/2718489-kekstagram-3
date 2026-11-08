const hasValidLength = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  const normalizeStr = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = normalizeStr.split('').reverse().join('');
  return normalizeStr === reversedStr;
};

const getNumbersFromString = (str) => {
  if (Number.isFinite(str)) {
    const normalizeNumber = str.toString().replace('.', ''); // число без дробной части "12.34 -> 1234"
    return Math.abs(parseInt(normalizeNumber, 10));
  }
  const result = str.split('').filter((char) => !Number.isNaN(parseInt(char, 10))).join('');
  return result.length > 0 ? Math.abs(parseInt(result, 10)) : NaN;
};
