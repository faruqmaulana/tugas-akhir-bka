/* eslint-disable @typescript-eslint/no-var-requires */
import { type NextApiRequest, type NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

export default async function signature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  // Get the timestamp in seconds
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using the Node.js SDK method api_sign_request
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET as string
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
}
