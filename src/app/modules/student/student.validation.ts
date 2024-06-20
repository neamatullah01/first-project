import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.pattern.name': '{#label} must be in capitalized format',
    }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, 'alphabetic')
    .messages({
      'string.pattern.name': '{#label} must contain only letters',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Invalid gender, it must be either "male" or "female"',
  }),
  dateOfBirth: Joi.date().iso(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
