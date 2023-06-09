import type { NextApiRequest, NextApiResponse } from "next";

import { addAuthAccount } from "@/helpers/user";
import { Data } from "@/types/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return addAuthAccount(req, res);
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
