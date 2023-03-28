import Head from "next/head";
import Image from "next/image";
import { Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title> Log In | BFAM Ticketing </title>
        <meta name="description" content="Log In with an existing account" />
      </Head>
      <Grid container height="100vh">
        <Grid item md={6} lg={8} position="relative">
          <Image
            src="/assets/login-bg.jpg"
            alt="Keyboard and Tablet with stylus"
            style={{ objectFit: "cover", objectPosition: "right" }}
            fill
          />
        </Grid>
        <Grid container item md={6} lg={4} alignItems="center" padding={5}>
          <Grid item xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
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
