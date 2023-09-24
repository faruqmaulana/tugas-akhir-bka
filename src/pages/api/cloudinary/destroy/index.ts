import { v2 as cloudinary } from "cloudinary";
import { type NextApiRequest, type NextApiResponse } from "next";
import sessionMiddleware from "~/common/libs/sessionMiddleware";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface MyCustomRequestBody extends NextApiRequest {
  body: {
    payload: string;
  };
}

export default async function assetDestroyer(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  await sessionMiddleware(req, res);

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const payloads = req.body.payload.split(",");
  const IS_MULTIPLE_DELETE = payloads.length > 1;

  // ** HANDLE DELETE SINGLE FILE */
  if (!IS_MULTIPLE_DELETE) {
    return cloudinary.uploader.destroy(
      payloads[0] as string,
      (error, result) => {
        res.statusCode = 200;
        res.json(result);
      }
    );
  }

  // ** HANDLE DELETE MULTIPLE FILE */
  return cloudinary.api.delete_resources(payloads, (error, result) => {
    res.statusCode = 200;
    res.json(result);
  });
}
