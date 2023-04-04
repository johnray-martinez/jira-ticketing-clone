import { Project } from "@/types/project";
import { openClient, closeClient, PROJECT_COLLECTION } from "./db";

export const createProject = async (project: Project) => {
  const db = await openClient();

  await db.collection(PROJECT_COLLECTION).insertOne(project);
  closeClient();
};
