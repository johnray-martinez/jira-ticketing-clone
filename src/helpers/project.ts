import { Project } from "@/types/project";
import { User } from "@/types/user";
import { ObjectId } from "mongodb";
import {
  openClient,
  closeClient,
  PROJECT_COLLECTION,
  USER_COLLECTION,
} from "./db";

export const createProject = async (project: Project) => {
  const db = await openClient();

  await db.collection(PROJECT_COLLECTION).insertOne(project);
  const userEmails = project.participants.map(user => user.email);
  try {
    await db
      .collection<User>(USER_COLLECTION)
      .updateMany(
        { email: { $in: userEmails }, project: { $nin: [project.id] } },
        { $push: { project: project.id } }
      );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  closeClient();
};

export const findProjectById = async (id: string) => {
  const db = await openClient();

  const res = await db.collection<Project>(PROJECT_COLLECTION).findOne({ id });

  closeClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...project } = res as Project & {
    _id: ObjectId;
  };

  return project;
};

export const getProjects = async (ids: string[]) => {
  const db = await openClient();

  const projects = await db
    .collection<Project>(PROJECT_COLLECTION)
    .find({
      id: { $in: ids },
    })
    .toArray();

  closeClient();

  return projects.map(project => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...restOfProject } = project as Project & {
      _id: ObjectId;
    };

    return restOfProject;
  });
};
