import Joi from "joi";

const optionalString = Joi.string().trim();
const requiredString = optionalString.required();
const requiredEmail = requiredString.email();
// const optionalNumber = Joi.number().min(1).integer();
// const requiredNumber = optionalNumber.required();
// const requiredDate = Joi.date().required();
// const requiredRegexPhone = optionalString.required().regex(/(234|0)[7-9][0-1][0-9]{8}/);

export const SIGNUP = Joi.object().keys({
	firstName: requiredString,
	lastName: requiredString,
	email: requiredEmail,
	password: requiredString
});

export const LOGIN = Joi.object({
	email: requiredEmail,
	password: requiredString
});
