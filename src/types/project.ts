import { User } from "./user";
import { Ticket } from "./ticket";

export type Project = {
  name: string;
  swimlanes: string[];
  participants: User[];
  tickets: Ticket[];
};
