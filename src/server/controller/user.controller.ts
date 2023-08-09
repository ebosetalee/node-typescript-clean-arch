import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { UserRepo } from "../../models/user";
import { generateJwtToken } from "../utils/jwt";

export class UserController extends BaseController {
	getMany = async (req: Request, res: Response) => {
		try {
			const users = await UserRepo.getPaged(req.query);

			const data = { message: "Users Retrieved Successfully", data: users };

			this.handleSuccess(req, res, data);
		} catch (error) {
			this.handleError(req, res, error);
		}
	};

	/**
	 * Creates a user account and generate token session
	 */
	signup = async (req: Request, res: Response) => {
		try {
			const user = await UserRepo.createAccount(req.body);

			const token = await generateJwtToken(user);

			const data = { message: "Sign Up successful", data: { user, token } };

			this.handleSuccess(req, res, data);
		} catch (err) {
			this.handleError(req, res, err);
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			const user = await UserRepo.logIntoAccount(req.body.email);

			const token = await generateJwtToken(user);

			const data = { message: "User logged in successfully", data: { user, token } };

			this.handleSuccess(req, res, data);
		} catch (err) {
			this.handleError(req, res, err);
		}
	};

	getOne = async (req: Request, res: Response) => {
		try {
			const user = await UserRepo.byID(req.params.id);

			const data = { message: "User Retrieved Successfully", data: user };

			this.handleSuccess(req, res, data);
		} catch (error) {
			this.handleError(req, res, error);
		}
	};
}

export const users = new UserController();
