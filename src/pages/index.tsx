import SignUpFormModal from "@/components/SignUpFormModal";
import Head from "next/head";

export default function Home() {
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
      </main>
    </>
  );
}
