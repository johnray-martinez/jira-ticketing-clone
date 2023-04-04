export type User = {
  email: string;
  _id: string;
  displayName: string;
};

export type UserAuth = {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
};
