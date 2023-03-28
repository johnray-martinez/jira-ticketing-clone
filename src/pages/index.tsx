import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Grid, Box } from "@mui/material";

import { signOut } from "next-auth/react";
import { styles } from "@/styles/home.styles";

export default function Home() {
  const signOutPlz = async () => {
    await signOut();
  };
  return (
    <>
      <Head>
        <title>Welcome | Tix</title>
        <meta
          name="description"
          content="Ticketing system created to practice Nextjs, react, typescript, redux and much more and probably to track stuff too"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box sx={styles.image}>
          <Box sx={styles.logoContainer}>
            <Image
              src="/assets/logo-white.svg"
              width={50}
              height={50}
              alt="Tix logo icon"
            />
          </Box>
          <Box sx={styles.textContainer}>
            <Typography sx={styles.subtitle} component="h1" variant="h6">
              WELCOME TO TIX
            </Typography>
            <Typography component="h2" variant="h2">
              Our goal is to get you home before you hit the traffic
            </Typography>
            <Grid container paddingTop={5}>
              <Grid item xs={12}>
                <Link href="/login">
                  <Button sx={styles.button} variant="outlined">
                    Start a project
                  </Button>
                </Link>
                <Button
                  onClick={signOutPlz}
                  sx={styles.button}
                  variant="outlined"
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={styles.overlay} />
          <Image
            src="/assets/landing-bg.jpg"
            alt="white background with green leaves"
            width={1350}
            height={1080}
          />
        </Box>
      </main>
    </>
  );
}
