import { useCollections } from "../shopify/hooks";
function Tests() {
  const { isLoadingCollections, collections, errorCollections } =
    useCollections();
  !isLoadingCollections ? console.log(collections) : null;
  errorCollections ? console.log(errorCollections) : null;
  return <div></div>;
}

export default Tests;
