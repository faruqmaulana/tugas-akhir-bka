import { type NextApiRequest, type NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string; // Get the PDF URL from the query string
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.end(Buffer.from(buffer));
}
