import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return res.status(200).json({ name: "JOR" });
  }
  return res
    .status(500)
    .json({ name: "Error", message: "Cannot handle that operation" });
}
