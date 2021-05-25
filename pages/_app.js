import Head from "next/head";

import "../styles/global.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>

        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </>
  );
}
