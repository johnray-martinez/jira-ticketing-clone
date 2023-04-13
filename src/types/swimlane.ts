import { User } from "@/types/user";

export type Ticket = {
  id: string;
  name: string;
  description: string;
  user: User;
};

export type Status = {
  id: string;
  name: string;
};

export type Swimlane = {
  status: Status;
  tickets: Ticket[];
};
