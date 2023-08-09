import { SchemaDefinition, SchemaOptions, Schema, SchemaTypes } from "mongoose";

import { timestamps } from ".";

export const SchemaFactory = <T>(schemaFields: SchemaDefinition<T>, options?: SchemaOptions) => {
	if (!schemaFields || Object.keys(schemaFields).length === 0) {
		throw new Error("Please specify schemaFields");
	}

	return new Schema<T>(
		{
			deleted_at: { type: SchemaTypes.Date },
			...schemaFields
		},
		{
			...options,
			...timestamps,
			// @ts-ignore
			selectPopulatedPaths: false
		}
	);
};
