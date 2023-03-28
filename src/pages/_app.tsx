import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// import { UserContextProvider } from "@/store/userContext";

import "../styles/globalStyles.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <UserContextProvider> */}
      <Component {...pageProps} />
      {/* </UserContextProvider> */}
    </SessionProvider>
  );
}
