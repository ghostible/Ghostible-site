import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "@/components/layout";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script"; 

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true, 
    });
  }, []);

  return (
    <>
      {/* ✅ Google Analytics Scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17491576398"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17491576398');
        `}
      </Script>

      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </>
  );
}
