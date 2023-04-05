import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import DashboardLayout from "@/layouts/DashboardLayout";
import UserContext from "@/store/userContext";
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { Typography } from "@mui/material";
import { findUser } from "@/helpers/user";
import { getProjects } from "@/helpers/project";

type ProjectsPageProps = {
  currentUser: User;
  userProjects: Project[];
};

const ProjectsPage = ({ currentUser, userProjects }: ProjectsPageProps) => {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setCurrentUser(currentUser, userProjects);
  });
  return (
    <>
      <Head>
        <title> Dashboard | Tix</title>
        <meta
          name="description"
          content="Create a project or access an existing one. Collaborate with your team towards your goal!"
        />
      </Head>
      <DashboardLayout>
        <Typography variant="h1" component="h1">
          This is where the projects overview will live
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default ProjectsPage;

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

  const user = (await findUser(session.user?.email as string)) as User;
  const projects = (await getProjects(user.project)) as Project[];

  return {
    props: {
      currentUser: user,
      userProjects: projects,
    },
  };
};
