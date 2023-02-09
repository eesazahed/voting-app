import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
