import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { User, UserAuth } from "@/types/user";
import { encryptPassword } from "./authentication";
import { Data } from "../types/data";

// DB VARIABLES AND FUNCTIONS
const USER_COLLECTION = "users";
const AUTH_COLLECTION = "auth";

const openClient = async () =>
  MongoClient.connect(process.env.MONGODB_URI as string);

export const findUser = async (email: string, targetAuth = false) => {
  const client = await openClient();
  const db = client.db();

  const result = await db
    .collection<User | UserAuth>(targetAuth ? AUTH_COLLECTION : USER_COLLECTION)
    .findOne({ email });

  client.close();

  return result;
};

export const findUsers = async (email: string) => {
  const client = await openClient();
  const db = client.db();

  const result = await db
    .collection<User>(USER_COLLECTION)
    .find({ email: { $regex: email } })
    .toArray();

  client.close();

  return result;
};

export const addAuthAccount = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const client = await openClient();
  const db = client.db();

  const user = await findUser(req.body.email, true);

  if (user) {
    client.close();

    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await encryptPassword(password);

  await db.collection(AUTH_COLLECTION).insertOne({
    email,
    hashedPassword,
    firstName,
    lastName,
  });

  client.close();

  return res.status(200).json({ success: true, message: "Successful" });
};

export const addUserProfile = async ({
  email,
  displayName,
}: {
  email: string;
  displayName: string;
}) => {
  const client = await openClient();
  const db = client.db();

  const user = await findUser(email);

  if (user) {
    client.close();

    throw new Error("User already exists with that email.");
  }

  await db.collection(USER_COLLECTION).insertOne({
    email,
    displayName,
  });

  client.close();
};
