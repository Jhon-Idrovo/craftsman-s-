import { useProduct } from "../shopify/hooks";
import ProductShowcaseCarousel from "../components/ProductShowcaseCarousel";
import { useState, useRef } from "react";
import Loading from "../components/Loading";

function ProductDetail({ productHandle, addVariantToCart }) {
  //format = {description:'', title:'',
  // images:['url'],
  //variants:[{price:,title:,available:true, id:''}]}
  //id:''
  const [quantity, setQuantity] = useState(0);
  const { isLoadingProduct, product } = useProduct(productHandle);

  const urlEl = useRef();
  const linkToClipboard = () => {
    urlEl.current.focus();
    urlEl.current.select();
    try {
      const didCopy = document.execCommand("copy");
      alert(`Link was ${didCopy ? "copied" : "not copied, please try again"}`);
    } catch (e) {
      alert("An error happened while copying the link");
    }
  };

  if (isLoadingProduct)
    return (
      <Loading>
        <p>Loading Product</p>
      </Loading>
    );
  return (
    <div className="product-detail-container">
      <ProductShowcaseCarousel imgs={product.images} />
      <div className="m-4">
        <h3 className="font-semibold text-xl mb-4">{product.title}</h3>

        <p>{product.description}</p>
        <div className="my-8">
          <button
            className="w-min border-2 px-1 "
            onClick={() => setQuantity((prevQ) => prevQ + 1)}
          >
            +
          </button>
          <input
            className="w-8 border-t-2 border-b-2 text-center "
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="w-min border-2 px-1  "
            onClick={() => setQuantity((prevQ) => prevQ - 1)}
            disabled={quantity == 0}
          >
            -
          </button>

          <button
            className="CTA ml-2"
            onClick={() => addVariantToCart(product.variants[0].id, quantity)}
          >
            ADD TO CART
          </button>
        </div>
        <p>Share it:</p>
        <button className="CTA" onClick={linkToClipboard}>
          Copy link
        </button>
        <textarea id="" cols="30" rows="10" ref={urlEl} hidden>
          {`http://localhost:3000/shop/n/n/${productHandle}`}
        </textarea>
      </div>
    </div>
  );
}

export default ProductDetail;
