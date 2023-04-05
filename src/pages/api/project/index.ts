import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Data } from "@/types/data";
import { createProject } from "@/helpers/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (!session)
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access." });

  if (req.method === "POST") {
    try {
      await createProject(req.body);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong with our server.",
      });
    }

    return res.status(200).json({ success: true, message: "Successful" });
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
