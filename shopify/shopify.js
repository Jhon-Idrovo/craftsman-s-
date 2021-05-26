import Client from "shopify-buy/index.unoptimized.umd";

// Initializing a client to return content in the store's primary language
export const client = Client.buildClient({
  domain: "craftsman-s.myshopify.com",
  storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
});

// Initializing a client to return translated content
// export const clientWithTranslatedContent = Client.buildClient({
//   domain: "craftsman-s.myshopify.com",
//   storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
//   language: "ja-JP",
// });
