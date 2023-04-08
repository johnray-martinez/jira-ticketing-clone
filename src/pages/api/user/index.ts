import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { findUsers } from "@/helpers/user";

import { Data } from "@/types/data";
import { User } from "@/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { result: User[] }>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).json({ message: "Unauthorized", success: false });
  }

  if (req.method === "GET") {
    const users = await findUsers(req.query.query as string);

    return res.status(200).json({
      result: users,
    });
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
