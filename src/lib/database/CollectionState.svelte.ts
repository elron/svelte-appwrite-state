import type { Databases, Models } from "appwrite";
import { type DatabaseName, type CollectionName, type CollectionAttributeMap } from "$lib/appwrite.types.js";

export class CollectionState<
	T extends DatabaseName,
	U extends CollectionName<T>
> {
	#databases: Databases;
	#databaseId: T;
	#collectionId: U;
	#queries: string[];

    documents: CollectionAttributeMap[T][U][] | undefined = $state();

	constructor(databases: Databases, databaseId: T, collectionId: U, queries: string[] = []) {
		this.#databases = databases;
		this.#databaseId = databaseId;
		this.#collectionId = collectionId;
		this.#queries = queries;
		this.#read();
	}

	async #read() {
		const result = await this.#databases.listDocuments<CollectionAttributeMap[T][U]>(
			this.#databaseId,
			this.#collectionId,
			this.#queries
		);

        console.log(result);

        this.documents = result.documents;
	}
}
