import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

// TYPES
type Data = {
  message: string;
};

// HELPERS
const encryptPassword = async (password: string): Promise<string> => {
  return hash(password, 12);
};

// DB VARIABLES AND FUNCTIONS
const USER_COLLECTION = "users";
const openClient = async () =>
  MongoClient.connect(process.env.DB_URI as string);

export const addUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const client = await openClient();
  const db = client.db();

  const { email, firstName, lastName, password } = req.body;
  const hashedPassword = await encryptPassword(password);

  await db.collection(USER_COLLECTION).insertOne({
    email,
    firstName,
    lastName,
    hashedPassword,
  });

  client.close();

  return res.status(200).json({ message: "Successful" });
};
