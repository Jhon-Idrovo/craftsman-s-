import { useState, useMemo } from "react";

import Head from "next/head";

import "../styles/global.css";
import NavBarV2 from "../components/NavBarV2";
import Footer from "../components/Footer";

import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Context } from "../shopify/contex";

const httpLink = createHttpLink({
  uri: "https://craftsman-s.myshopify.com/api/2021-04/graphql.json",
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_ACCESS_TOKEN,
    Accept: "application/json",
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  const [checkout, setCheckout] = useState({ lineItems: { edges: [] } });

  const memoizedValue = useMemo(
    () => ({ checkout, setCheckout }),
    [checkout, setCheckout]
  );
  return (
    <>
      <ApolloProvider client={client}>
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
        <Context.Provider value={memoizedValue}>
          <NavBarV2 />
          <Component {...pageProps} />
        </Context.Provider>
        <Footer />
      </ApolloProvider>
    </>
  );
}
