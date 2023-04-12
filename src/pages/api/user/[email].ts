import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { findUser } from "@/helpers/user";

import { Data } from "@/types/data";
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { getProjects } from "@/helpers/project";

type UserAPI = User & {
  project: Project[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { result: UserAPI }>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).json({ message: "Unauthorized", success: false });
  }

  if (req.method === "GET") {
    const user = await findUser(req.query.email as string);

    if (!user) {
      return res
        .status(403)
        .json({ message: "User unauthorized", success: false });
    }

    const projects = await getProjects((user as User).project);

    const userObj = { ...user, project: projects } as UserAPI;

    return res.status(200).json({ result: userObj });
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
