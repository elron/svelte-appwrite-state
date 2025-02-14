import { Client, Databases } from "appwrite";

const appwrite = new Client();
appwrite.setProject("svelte-appwrite-state");

export const databases = new Databases(appwrite);
