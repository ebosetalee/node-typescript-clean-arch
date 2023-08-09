import { Request, Response, NextFunction } from "express";
import { ValidationError, ObjectSchema } from "joi";
import { validationError } from "../../common/errors";

type ValidatorContext = "body" | "query" | "params";

const parseError = (error: ValidationError) => {
	const inputFields: string = error.details
		.map(detail => detail.message)
		.join(", ")
		.replace(/"/g, "");

	const failed = error.details.map(err => err.path.join("."));

	return { inputFields, failed };
};

const validate =
	(schema: ObjectSchema, context: ValidatorContext = "body", stripUnknown = false) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const { value, error } = schema.validate(req[context], {
			abortEarly: false,
			allowUnknown: true,
			stripUnknown
		});

		if (error) {
			const errorDetails = parseError(error);

			throw new validationError(`Invalid input: ${errorDetails.inputFields}`, {
				failed_fields: errorDetails.failed
			});
		}

		Object.assign(req, value);
		return next();
	};

export default validate;
