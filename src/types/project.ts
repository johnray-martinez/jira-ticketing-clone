import { User } from "./user";
import { Ticket } from "./ticket";

export type Project = {
  name: string;
  swimlanes: Map<string, string>;
  participants: User[];
  tickets: Ticket[];
};
