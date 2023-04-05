import type { NextApiRequest, NextApiResponse } from "next";

import { User, UserAuth } from "@/types/user";
import { ObjectId } from "mongodb";
import { encryptPassword } from "./authentication";
import { Data } from "../types/data";
import {
  openClient,
  closeClient,
  AUTH_COLLECTION,
  USER_COLLECTION,
} from "./db";

export const findUser = async (email: string, targetAuth = false) => {
  const db = await openClient();

  const result = await db
    .collection<User | UserAuth>(targetAuth ? AUTH_COLLECTION : USER_COLLECTION)
    .findOne({ email });

  closeClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...user } = result as (User | UserAuth) & {
    _id: ObjectId;
  };

  return user;
};

export const findUsers = async (email: string) => {
  const db = await openClient();
  const result = await db
    .collection<User>(USER_COLLECTION)
    .find({ email: { $regex: email } })
    .toArray();

  closeClient();

  return result.map(data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...user } = data as User & {
      _id: ObjectId;
    };
    return user;
  });
};

export const addAuthAccount = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const db = await openClient();

  const user = await findUser(req.body.email, true);

  if (user) {
    closeClient();

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

  closeClient();

  return res.status(200).json({ success: true, message: "Successful" });
};

export const addUserProfile = async ({
  email,
  displayName,
}: {
  email: string;
  displayName: string;
}) => {
  const db = await openClient();

  const user = await findUser(email);

  if (user) {
    closeClient();

    throw new Error("User already exists with that email.");
  }

  await db.collection(USER_COLLECTION).insertOne({
    email,
    displayName,
  });

  closeClient();
};
