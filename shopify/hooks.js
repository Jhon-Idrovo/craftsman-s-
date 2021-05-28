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
  //a collection has associated only one product type with the same name
  console.log(parentCollection, childCollection);
  const filter = childCollection
    ? parentCollection + "-" + childCollection
    : `Main-${parentCollection}`;
  const query2 = gql`
    {
      collections(query: "title:${filter}", first: 100) {
        edges {
          node {
            title
            products(first: 250) {
              edges {
                node {
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                      }
                    }
                  }
                  id
                  description
                  availableForSale
                  variants(first: 1) {
                    edges {
                      node {
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const {
    loading: isLoadingProducts,
    data,
    error: errorProducts,
  } = useQuery(query2);

  const parsedProducts = () => {
    if (!data) return [];
    //products = [{images:[{src:'url'}], tittle:'', variants: [{price:}]}]
    console.log(data);
    let fetchedProducts = data.collections.edges[0].node.products;
    let products = [];
    fetchedProducts.edges.map((edge) => {
      let product = {};
      product["title"] = edge.node.title;
      product["images"] = [{ src: edge.node.images.edges[0].node.originalSrc }];
      product["variants"] = [
        { price: edge.node.variants.edges[0].node.priceV2.amount },
      ];
      products.push(product);
    });
    console.log(products);
    return products;
  };

  return {
    isLoadingProducts,
    errorProducts,
    products: parsedProducts(),
  };
}
