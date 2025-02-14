// This file is auto-generated. Do not edit manually.
import type { Models } from "appwrite";

export const appwriteConfig = {
    "databases": [
        {
            "$id": "database",
            "name": "database",
            "enabled": true
        }
    ],
    "collections": [
        {
            "$id": "tasks",
            "$permissions": [
                "create(\"any\")",
                "read(\"any\")",
                "update(\"any\")",
                "delete(\"any\")"
            ],
            "databaseId": "database",
            "name": "tasks",
            "enabled": true,
            "documentSecurity": false,
            "attributes": [
                {
                    "key": "title",
                    "type": "string",
                    "required": false,
                    "array": false,
                    "size": 256,
                    "default": null
                },
                {
                    "key": "isCompleted",
                    "type": "boolean",
                    "required": false,
                    "array": false,
                    "default": null
                }
            ],
            "indexes": []
        },
        {
            "$id": "users",
            "$permissions": [],
            "databaseId": "database",
            "name": "users",
            "enabled": true,
            "documentSecurity": false,
            "attributes": [
                {
                    "key": "name",
                    "type": "string",
                    "required": false,
                    "array": false,
                    "size": 100,
                    "default": null
                }
            ],
            "indexes": []
        }
    ],
    "projectId": "svelte-appwrite-state",
    "projectName": "svelte-appwrite-state",
    "settings": {
        "services": {
            "account": true,
            "avatars": true,
            "databases": true,
            "locale": true,
            "health": true,
            "storage": true,
            "teams": true,
            "users": true,
            "functions": true,
            "graphql": true,
            "messaging": true
        },
        "auth": {
            "methods": {
                "jwt": true,
                "phone": true,
                "invites": true,
                "anonymous": true,
                "email-otp": true,
                "magic-url": true,
                "email-password": true
            },
            "security": {
                "duration": 31536000,
                "limit": 0,
                "sessionsLimit": 10,
                "passwordHistory": 0,
                "passwordDictionary": false,
                "personalDataCheck": false,
                "sessionAlerts": false,
                "mockNumbers": []
            }
        }
    }
} as const;

export type DatabaseName = "database";

export type TasksCollection = "tasks";
export type UsersCollection = "users";

export type TasksCollectionAttributes = {
	title: string;
	isCompleted: boolean;
} & Models.Document;

export type UsersCollectionAttributes = {
	name: string;
} & Models.Document;


export type CollectionsByDatabase = {
	"database": "tasks" | "users";
};

export type CollectionAttributeMap = {
	"database": {
		"tasks": TasksCollectionAttributes & Models.Document;
		"users": UsersCollectionAttributes & Models.Document;
	};
};

export type CollectionName<T extends DatabaseName> = CollectionsByDatabase[T];

// Fully Typed CollectionState Function
// export function CollectionState<
// 	T extends DatabaseName,
// 	U extends CollectionName<T>
// >(database: T, collection: U): (CollectionAttributeMap[T][U] & Models.Document)[] {
// 	return [] as (CollectionAttributeMap[T][U] & Models.Document)[];
// }
