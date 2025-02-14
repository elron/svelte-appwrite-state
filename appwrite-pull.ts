import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Define paths
const inputPath = join(__dirname, "appwrite.json");
const outputPath = join(__dirname, "src", "lib", "appwrite.types.ts");

// Appwrite type mapping to TypeScript
const typeMapping: Record<string, string> = {
  string: "string",
  boolean: "boolean",
  integer: "number",
  float: "number",
  email: "string",
  url: "string",
  ip: "string",
  enum: "string",
  datetime: "string",
};

try {
  // Read and parse JSON
  const jsonData = readFileSync(inputPath, "utf-8");
  const parsedData = JSON.parse(jsonData);
  const databases = parsedData.databases || [];
  const collections = parsedData.collections || [];

  if (databases.length === 0)
    throw new Error("No databases found in appwrite.json");
  if (collections.length === 0)
    throw new Error("No collections found in appwrite.json");

  // Start building the TypeScript file
  let outputContent = `// This file is auto-generated. Do not edit manually.\n`;
  outputContent += `import type { Models } from "appwrite";\n\n`;
  outputContent += `export const appwriteConfig = ${jsonData} as const;\n\n`;

  // Extract database names
  const databaseNames = databases.map((db: any) => `"${db.$id}"`);
  outputContent += `export type DatabaseName = ${databaseNames.join(" | ")};\n\n`;

  // Generate collection types and mappings
  const collectionNamesByDatabase: Record<string, string[]> = {};
  let collectionAttributeTypes = "";
  let collectionTypeMappings: Record<string, string[]> = {};

  collections.forEach((collection: any) => {
    const collectionName = collection.$id;
    const databaseId = collection.databaseId;
    const typeName = `${capitalize(collectionName)}Collection`;
    const attributesTypeName = `${capitalize(collectionName)}CollectionAttributes`;

    // Organize collections under their respective databases
    if (!collectionNamesByDatabase[databaseId]) {
      collectionNamesByDatabase[databaseId] = [];
    }
    collectionNamesByDatabase[databaseId].push(`"${collectionName}"`);

    // Generate collection type
    outputContent += `export type ${typeName} = "${collectionName}";\n`;

    // Generate attributes type, ensuring it extends Models.Document
    if (collection.attributes?.length > 0) {
      const attributes = collection.attributes
        .map((attr) => `\t${attr.key}: ${typeMapping[attr.type] || "unknown"};`)
        .join("\n");

      collectionAttributeTypes += `export type ${attributesTypeName} = {\n${attributes}\n} & Models.Document;\n\n`;
    } else {
      collectionAttributeTypes += `export type ${attributesTypeName} = Models.Document;\n\n`;
    }

    // Map collections to their attributes
    if (!collectionTypeMappings[databaseId]) {
      collectionTypeMappings[databaseId] = [];
    }
    collectionTypeMappings[databaseId].push(
      `\t\t"${collectionName}": ${attributesTypeName} & Models.Document;`
    );
  });

  outputContent += `\n${collectionAttributeTypes}`;

  // Generate valid collection names for each database
  const databaseCollectionTypes = Object.entries(collectionNamesByDatabase)
    .map(([db, collections]) => `\t"${db}": ${collections.join(" | ")};`)
    .join("\n");

  outputContent += `
export type CollectionsByDatabase = {
${databaseCollectionTypes}
};

export type CollectionAttributeMap = {
${Object.entries(collectionTypeMappings)
  .map(([db, mappings]) => `\t"${db}": {\n${mappings.join("\n")}\n\t};`)
  .join("\n")}
};

export type CollectionName<T extends DatabaseName> = CollectionsByDatabase[T];

// Fully Typed CollectionState Function
// export function appwriteCollection<
// 	T extends DatabaseName,
// 	U extends CollectionName<T>
// >(database: T, collection: U): (CollectionAttributeMap[T][U] & Models.Document)[] {
// 	return [] as (CollectionAttributeMap[T][U] & Models.Document)[];
// }
`;

  // Write to TypeScript file
  writeFileSync(outputPath, outputContent, "utf-8");
  console.log("Generated TypeScript schema file:", outputPath);
} catch (error) {
  console.error("Error generating TypeScript schema:", error);
  process.exit(1);
}

// Capitalize function
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
