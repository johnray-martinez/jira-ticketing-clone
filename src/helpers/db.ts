import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

// DB CONSTANTS
export const USER_COLLECTION = "users";
export const AUTH_COLLECTION = "auth";
export const PROJECT_COLLECTION = "project";

// DB HELPERS
export const openClient = async () => {
  client = await MongoClient.connect(process.env.MONGODB_URI as string);

  return client.db();
};

export const closeClient = () => {
  if (client) client.close();
};
