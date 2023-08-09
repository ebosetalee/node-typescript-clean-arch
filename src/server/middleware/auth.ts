import { tokenVerifier } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { InvalidAuthTokenError, MissingAuthHeaderError } from "common/errors";
import { AuthResponse } from "typings";

const UserAuth = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new MissingAuthHeaderError();
	}

	const token = authHeader.split(" ")[1];
	const decoded: AuthResponse = tokenVerifier(token);

	if (decoded) {
		req["user"] = decoded;
		next();
	}

	throw new InvalidAuthTokenError();
};

export default { UserAuth };
