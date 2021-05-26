import { client } from "./shopify";
import { useQuery } from "react-query";

export function useCollections() {
  const fetchCollections = async () => {
    let collections = await client.collection
      .fetchAll()
      .then((collections) => collections);
    console.log(collections);
    let parsedCollections = {};
    collections.map((collection) => {
      if (collection.title.startsWith("Main")) {
        parsedCollections[collection.title.slice(5)] = [];
      } else {
        const [parentCollectionTitle, childCollectionTitle] =
          collection.title.split("-");
        parsedCollections[parentCollectionTitle].push(childCollectionTitle);
      }
    });
    console.log(parsedCollections);
    return parsedCollections;
  };
  const {
    isLoading: isLoadingCollections,
    isError: isErrorCollections,
    errorCollections,
    data: collections,
  } = useQuery("collections", fetchCollections);
  return {
    isLoadingCollections,
    isErrorCollections,
    errorCollections,
    collections,
  };
}

export function useProducts() {
  const fetchProducts = () =>
    client.product.fetchAll().then((products) => {
      console.log(products);
      return products;
    });
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    errorProducts,
    data: products,
  } = useQuery("products", fetchProducts);
  return {
    isLoadingProducts,
    isErrorProducts,
    errorProducts,
    products,
  };
}
