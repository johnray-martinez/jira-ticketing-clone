export type User = {
  email: string;
  displayName: string;
  project: string[];
};

export type UserAuth = {
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
};
