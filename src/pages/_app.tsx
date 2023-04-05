import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/Navbar";
import { UserContextProvider } from "@/store/userContext";

import "../styles/globalStyles.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <>
          <NavBar />
          <Component {...pageProps} />
        </>
      </UserContextProvider>
    </SessionProvider>
  );
}
