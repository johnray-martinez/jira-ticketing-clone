import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "@/helpers/apiHelpers/authentication";

type Data = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return addUser(req, res);
  }

  return res.status(409).json({
    success: false,
    message: "Invalid operation. Contact your administrator.",
  });
}
