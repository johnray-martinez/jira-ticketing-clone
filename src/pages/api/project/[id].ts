import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Data } from "@/types/data";
import { Project } from "@/types/project";
import { findProjectById } from "@/helpers/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | Data>
) {
  const session = await getSession({ req });
  if (!session)
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access." });

  if (req.method === "GET") {
    const project = await findProjectById(req.body.id);

    if (!project)
      return res
        .status(403)
        .json({ message: "Failed to fetch Project", success: false });

    return res.status(200).json({ ...project });
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
