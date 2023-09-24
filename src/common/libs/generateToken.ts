import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

export const generateToken = ({
  email,
  expiresIn = "2h",
}: {
  email: string;
  expiresIn?: string | number;
}) => {
  return jwt.sign(
    {
      email,
    },
    env.NEXTAUTH_SECRET as string,
    { expiresIn: expiresIn }
  );
};
