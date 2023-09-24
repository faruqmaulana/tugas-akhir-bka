import { type NextApiResponse } from "next";

const methodNotAllowed = (res: NextApiResponse) => {
  return res.status(405).json({ error: "Method not allowed" });
};

export default methodNotAllowed;
