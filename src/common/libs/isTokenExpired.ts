import jwt from "jsonwebtoken";

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    const expirationDatetimeInSeconds = exp * 1000;

    return Date.now() >= expirationDatetimeInSeconds;
  } catch {
    return true;
  }
};
