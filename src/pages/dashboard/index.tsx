import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Typography } from "@mui/material";

const DashboardPage = () => {
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
          DASHBOARD PAGE BIETCH
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
