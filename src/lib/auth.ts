
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch (error) {
    console.log(error)
    return null;
  }
};