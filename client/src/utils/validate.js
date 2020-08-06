export const validateName = (Name) => {
  if (!Name) {
    return 'Enter a valid name.';
  }
  return false;
};

export const validateEmail = (email) => {
  if (
    !email ||
    !email.match(
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return 'Enter a valid email.';
  }
  return false;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Enter a valid password.';
  } else if (password.length < 8) {
    return 'Password must atleast be 8 characters long.';
  }
  return false;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return false;
};
