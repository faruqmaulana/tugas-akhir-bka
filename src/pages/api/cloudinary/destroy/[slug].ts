import { v2 as cloudinary } from "cloudinary";
import { type NextApiRequest, type NextApiResponse } from "next";
import sessionMiddleware from "~/common/libs/sessionMiddleware";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function assetDestroyer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sessionMiddleware(req, res);

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const slug = req.query.slug;
  return cloudinary.uploader.destroy(slug as string, (error, result) => {
    res.statusCode = 200;
    res.json(result);
  });
}
