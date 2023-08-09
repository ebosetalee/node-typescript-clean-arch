import { AccountExistsError, AccountNotExistsError } from "../../common/errors";
import { BaseRepository } from "../base";
import { IUser } from "./user.model";
import UserSchema from "./user.schema";

class UserRepository extends BaseRepository<IUser> {
	constructor() {
		super("User", UserSchema);
	}

	/**
	 * Creates an account for a user
	 * @param body Body for creating a user
	 */
	async createAccount(body: IUser) {
		await this.isEmailUsed(body.email);

		return this.create(body);
	}

	async logIntoAccount(email: string) {
		const User = await UserRepo.byQuery({ email });
		if (!User) throw new AccountNotExistsError();

		return User;
	}

	/**
	 * Checks and throws an error if a particular email address is already tied to a different user account
	 */
	async isEmailUsed(email: string) {
		const user = await this.model.exists({ email });
		if (user) throw new AccountExistsError();
	}
}

export const UserRepo = new UserRepository();
