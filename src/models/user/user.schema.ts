import { SchemaFactory, trimmedRequiredString, trimmedRequiredLowercaseString } from "../base";
import { IUser } from "./user.model";

const UserSchema = SchemaFactory<IUser>({
	firstName: { ...trimmedRequiredString },
	lastName: { ...trimmedRequiredString },
	email: { ...trimmedRequiredLowercaseString }
});

export default UserSchema;
