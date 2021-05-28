import { useCollections, useProducts } from "../shopify/hooks";
function Tests() {
  const { isLoadingProducts, products } = useProducts("Stands");
  isLoadingProducts ? null : console.log(products);
  const { isLoadingCollections, collections, errorCollections } =
    useCollections();
  !isLoadingCollections ? console.log(collections) : null;
  errorCollections ? console.log(errorCollections) : null;
  return <div></div>;
}

export default Tests;
