import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
