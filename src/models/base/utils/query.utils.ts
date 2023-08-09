import { ClientSession, InsertManyOptions } from "mongoose";

export type Populations = InsertManyOptions["populate"];
export interface QueryResult<T> {
	page: number;
	per_page: number;
	total: number;
	filter_total: number;
	total_pages: number;
	sort: string | object;
	result: T[];
}

/**
 * A repository query that specifies pagination options
 */
export interface PaginationQuery {
	query?: object;
	page?: number;
	per_page?: number;
	projections?: string | object;
	populations?: Populations;
	sort?: string | object;
}

/**
 * A repository query
 */
export interface Query {
	query: object;
	projections?: string | object;
	populations?: Populations;
	session?: ClientSession;
	sort?: string | object;
}

export interface SelectOptions {
	projections?: string | object;
	populations?: Populations;
}

export interface Repository<T> {
	create(attributes: T): Promise<T>;
	createMany(attributes: T[], session: ClientSession): Promise<T[]>;
	byID(id: string, opts: SelectOptions): Promise<T>;
	byQuery(query: object, opts: SelectOptions): Promise<T>;
	getPaged(query: PaginationQuery): Promise<QueryResult<T>>;
	get(query: Query): Promise<T[]>;
	update(condition: string | object, update: object): Promise<T>;
	updateAll(condition: string | object, update: object): Promise<T[]>;
	remove(condition: string | object): Promise<T>;
	destroy(condition: string | object): Promise<T>;
}
