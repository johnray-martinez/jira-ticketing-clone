import DashboardLayout from "@/layouts/DashboardLayout";
import { ObjectId } from "mongodb";
import { Project } from "@/types/project";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { findProjectById } from "@/helpers/project";

const ProjectDetailsPage = ({
  // id,
  name,
}: // participants,
// tickets,
// swimlanes
Project) => {
  return (
    <DashboardLayout>
      <h1> {name}</h1>
      {/* This is where the kanban board will live */}
    </DashboardLayout>
  );
};

export default ProjectDetailsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const project = (await findProjectById(
    context.query.id as string
  )) as Project & { _id: ObjectId };

  if (!project) {
    return {
      redirect: {
        destination: "/project/create",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...project,
    },
  };
};
