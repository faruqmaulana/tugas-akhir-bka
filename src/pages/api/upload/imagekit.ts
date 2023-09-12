/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextApiRequest, NextApiResponse } from "next";
import ImageKit from "imagekit";
import { IncomingForm, Fields, Files } from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_PUBLIC_KEY as string,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const contents = await fs.readFile(data.files.null.path, {
      encoding: "base64",
    });

    const result = await imagekit.upload({
      file: contents,
      fileName: "test.jpg",
    });
    if (result) {
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "512",
            width: "512",
          },
        ],
      });
      res.status(200).json({
        url,
      });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err });
  }
};

export default handler;
