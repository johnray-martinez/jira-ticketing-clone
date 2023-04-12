import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import DashboardLayout from "@/layouts/DashboardLayout";
import { Typography } from "@mui/material";

const ProjectsPage = () => {
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

  return {
    props: {},
  };
};
