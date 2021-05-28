import { useProduct } from "../shopify/hooks";

function ProductDetail({ productHandle }) {
  //format = {description:'', title:'',
  // images:['url'],
  //variants:[{price:,title:,available:true}]}

  const { isLoadingProduct, product } = useProduct(productHandle);
  if (isLoadingProduct) return <div>is loading</div>;
  return (
    <div className="product-detail-container">
      {product.title}

      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;
