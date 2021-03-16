import validator from 'validator';
import isEmpty from './is-empty';

const validateRegisterInput = (data: any) => {
  const errors: any = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmpassword = !isEmpty(data.confirmpassword)
    ? data.confirmpassword
    : '';

  if (!validator.isLength(data.name, { min: 3, max: 15 })) {
    errors.name = 'Name must have min 3 & max 15 characters.';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email must be a valid email.';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }

  if (!validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = 'Password must have min 6 & max 15 characters.';
  }

  if (
    !validator.matches(
      data.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/
    )
  ) {
    errors.password =
      'Password must have at least one Special char, number, small letter, caps letter.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }

  if (!validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = 'Password does not match.';
  }

  if (validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = 'Confirm Password field is required.';
  }
  return {
    errors: errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateRegisterInput;
