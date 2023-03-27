import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { hash, compare } from "bcryptjs";

// TYPES
type Data = {
  message: string;
  success: boolean;
};

// HELPERS
const encryptPassword = async (password: string): Promise<string> => {
  return hash(password, 12);
};

export const verifyPassword = async (p1: string, p2: string) => {
  return compare(p1, p2);
};

// DB VARIABLES AND FUNCTIONS
const USER_COLLECTION = "users";
const openClient = async () =>
  MongoClient.connect(process.env.DB_URI as string);

export const findUser = async (email: string) => {
  const client = await openClient();
  const db = client.db();

  const result = await db.collection(USER_COLLECTION).findOne({ email });

  client.close();

  return result;
};

export const addUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const client = await openClient();
  const db = client.db();

  const user = await findUser(req.body.email);

  if (user) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  const { email, firstName, lastName, password } = req.body;
  const hashedPassword = await encryptPassword(password);

  await db.collection(USER_COLLECTION).insertOne({
    email,
    firstName,
    lastName,
    hashedPassword,
  });

  client.close();

  return res.status(200).json({ success: true, message: "Successful" });
};
