export function validatePassword(password: string) {
  const hasNoSpaces = !password.includes(' ');
  const isBetween_8_to_40 = password.length >= 8 && password.length <= 40;
  const hasUpperCase = new RegExp(/[A-Z]/).test(password);
  const hasLowerCase = new RegExp(/[a-z]/).test(password);
  const hasSpecialCharacter = new RegExp(/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/).test(password);
  const hasNumber = new RegExp(/\d/).test(password);

  return isBetween_8_to_40 && hasUpperCase && hasLowerCase && hasSpecialCharacter && hasNumber && hasNoSpaces;
}

export function validateEmail(email: string) {
  // Check if email is empty or contains spaces
  const hasNoSpaces = !email.includes(' ');

  // Check length (typical max email length is 254 characters)
  const hasValidLength = email.length > 0 && email.length <= 254;

  // Basic email format check using regex
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
  const hasValidFormat = emailRegex.test(email);

  // Check if it has exactly one @ symbol
  const hasOneAtSymbol = (email.match(/@/g) || []).length === 1;

  // Check if domain has at least one dot and valid TLD
  const [, domain] = email.split('@');
  const hasValidDomain = domain && domain.includes('.') && domain.lastIndexOf('.') < domain.length - 2;

  return hasNoSpaces &&
    hasValidLength &&
    hasValidFormat &&
    hasOneAtSymbol &&
    hasValidDomain;
}