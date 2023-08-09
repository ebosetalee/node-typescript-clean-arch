import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from "http-status";
import { ControllerError } from "../../common/errors";
import logger from "../../common/services/logger";

interface responseData {
	message: string;
	data: object;
}
export class BaseController {
	/**
	 * Handles operation success and sends a HTTP response
	 * @param req Express request
	 * @param res Express response
	 * @param data Success data
	 */
	handleSuccess = (req: Request, res: Response, data: responseData, code: number = OK) => {
		if (res.headersSent) return;

		res.status(code).json(data);
	};

	/**
	 * Handles operation error, sends a HTTP response and logs the error.
	 * @param req Express request
	 * @param res Express response
	 * @param error Error object
	 * @param message Optional error message. Useful for hiding internal errors from clients.
	 */
	handleError = (req: Request, res: Response, err: Error, message?: string) => {
		/**
		 * Useful when we call an asynchrous function that might throw
		 * after we've sent a response to client
		 */
		if (res.headersSent) return logger.error(err);

		//@ts-ignore
		const { data, code, metadata } = <ControllerError>err;

		const error = {
			code: code || INTERNAL_SERVER_ERROR,
			message: err.message || message || "Something went wrong try again later",
			metadata: metadata || data
		};

		// if (code === 11000) {
		//     error.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
		//     error.code = CONFLICT;
		// }
		// if (err.name == "CastError") {
		//     if (err.path.match(/id/i)) {
		//         error.message = `No item found with id : ${err.value}`;
		//     } else {
		//         error.message = err.message.replace(/"/g, "");
		//     }
		//     error.code = NOT_FOUND;
		// }
		res.status(error.code).json(error);
		logger.error(err);
	};
}
