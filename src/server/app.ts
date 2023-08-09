import compression from "compression";
import express, { Application, Router } from "express";
// import logger from "../common/services/logger";
// import errorHandler from "./middleware/error-handler";
import bodyParser from "./middleware/body-parser";
import responseTime from "response-time";
import cors from "cors";
import helmet from "helmet";
import loggerMiddleware from "./middleware/requestLogger";
import v1Router from "../routes";

export default class App {
	private server: Application;

	constructor() {
		this.server = express();

		this.registerMiddlewares();
		this.registerHandlers();
	}

	/**
	 * Registers middlewares on the application server
	 */
	private registerMiddlewares() {
		this.server.use(express.urlencoded({ extended: false }));
		this.server.use(compression());
		this.server.use(bodyParser);
		this.server.use(express.static("public"));
		this.server.disable("x-powered-by");
		this.server.use(helmet());
		this.server.use(cors());
		this.server.use(responseTime());

		this.server.use(loggerMiddleware);
	}

	/**
	 * Registers handlers
	 */
	private registerHandlers() {
		const router = Router();
		router.use("/v1", v1Router);

		this.server.use("/api", router);

		this.server.get("/", (_req, res) => {
			res.status(200).json({ status: "UP" });
		});

		this.server.use((_req, res) => {
			res.status(404).send("Whoops! Route doesn't exist.");
		});

		// process.on("uncaughtException", err => {
		// 	logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
		// 	logger.error(err);
		// 	process.exit(1);
		// });
	}

	/**
	 * Applies all routes and configuration to the server, returning the express application server.
	 */
	getServer() {
		return this.server;
	}
}
