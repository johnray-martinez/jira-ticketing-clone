import { hash, compare } from "bcryptjs";

// HELPERS
export const encryptPassword = async (password: string): Promise<string> => {
  return hash(password, 12);
};

export const verifyPassword = async (p1: string, p2: string) => {
  return compare(p1, p2);
};
