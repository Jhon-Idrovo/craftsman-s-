import { gql, useQuery } from "@apollo/client";
//the output should be on the form {Main-collection:[sub-collection1, sub-collection2]}
export function useCollections() {
  const mainCollections = gql`
    query {
      collections(first: 100) {
        edges {
          node {
            title
          }
        }
      }
    }
  `;
  const {
    loading: isLoadingCollections,
    error: errorCollections,
    data,
  } = useQuery(mainCollections);

  const parsedCollections = () => {
    if (isLoadingCollections | errorCollections) return {};
    console.log(data);
    let collections = {};
    data.collections.edges.map(({ node }) => {
      const [prefix, title] = node.title.split("-");
      if (prefix === "Main") {
        collections[title] = [];
      } else {
        collections[prefix].push(title);
      }
    });
    console.log(collections);
    return collections;
  };

  return {
    isLoadingCollections,
    errorCollections,
    collections: parsedCollections(),
  };
}

export function useProducts(parentCollection, childCollection) {
  return {
    // isLoadingProducts,
    // isErrorProducts,
    // errorProducts,
    // products,
  };
}
