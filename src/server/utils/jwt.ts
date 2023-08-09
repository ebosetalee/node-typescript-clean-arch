import jwt from "jsonwebtoken";
import env from "../../common/config/env";
import { AuthResponse } from "typings";

const { jwt_expiration, jwt_secret } = env;

export async function generateJwtToken(data: AuthResponse) {
	return jwt.sign(
		{
			id: data._id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		},
		jwt_secret,
		{ expiresIn: jwt_expiration }
	);
}

export const tokenVerifier = (authToken: string): AuthResponse => {
	const decoded = jwt.verify(authToken, jwt_secret);

	return decoded as AuthResponse;
};
