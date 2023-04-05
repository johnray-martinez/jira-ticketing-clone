import { ObjectId } from "mongodb";
import { User } from "./user";
import { Ticket } from "./ticket";

export type Project = {
  id: string;
  name: string;
  swimlanes: string[];
  participants: User[];
  tickets: Ticket[];
};

export type ProjectWithId = Project & {
  _id: ObjectId;
};
