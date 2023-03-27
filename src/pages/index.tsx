import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

import SignUpFormModal from "@/components/SignUpFormModal";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
      <Head>
        <title>BFAM Ticketing System</title>
        <meta
          name="description"
          content="Ticketing system created to practice Nextjs, react, typescript, redux and much more and probably to track stuff too"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUpFormModal />
        <Button onClick={() => signOut()}>Sign out</Button>
      </main>
    </>
  );
}
