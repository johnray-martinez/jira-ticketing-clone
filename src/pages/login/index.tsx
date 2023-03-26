import Head from "next/head";
import Image from "next/image";
import { Grid } from "@mui/material";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title> Log In | BFAM Ticketing </title>
        <meta name="description" content="Log In with an existing account" />
      </Head>
      <Grid container height="100vh">
        <Grid item md={6} position="relative">
          <Image
            src="/assets/login-bg.jpg"
            alt="Keyboard and Tablet with stylus"
            style={{ objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item md={6} />
      </Grid>
    </>
  );
};

export default LoginPage;
