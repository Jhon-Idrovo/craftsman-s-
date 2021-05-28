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
  console.log(parentCollection, childCollection);
  const filter = childCollection
    ? parentCollection + "-" + childCollection
    : `Main-${parentCollection}`;
  console.log(filter);
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
                  handle
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
      product["handle"] = edge.node.handle;
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

export function useProduct(productHandle) {
  const query = gql`
  {
    productByHandle(handle: "${productHandle}") {
      description
      images(first: 10) {
        edges {
          node {
            originalSrc
          }
        }
      }
      title
      variants(first: 10) {
        edges {
          node {
            priceV2 {
              amount
              currencyCode
            }
            title
            availableForSale
          }
        }
      }
    }
  }
  
  `;
  const { loading: isLoadingProduct, data } = useQuery(query);
  const parseProduct = () => {
    if (!data) return {};
    console.log(data);
    const fetchedProd = data.productByHandle;
    let product = {};
    //format = {description:'', title:'',
    // images:['url'],
    //variants:[{price:,title:,available:true}]}
    product["description"] = fetchedProd.description;
    product["title"] = fetchedProd.title;

    product["images"] = fetchedProd.images.edges.map(
      (edge) => edge.node.originalSrc
    );
    product["variants"] = fetchedProd.variants.edges.map((edge) => {
      return {
        price: edge.node.priceV2.amount,
        title: edge.node.title,
        available: edge.node.availableForSale,
      };
    });
    console.log(product);
    return product;
  };

  return {
    isLoadingProduct,
    product: parseProduct(),
  };
}
