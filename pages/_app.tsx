import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "@/components/layout";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import { useEffect } from 'react';
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true, 
    });
  }, []);

  // return <Component {...pageProps} />;
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
