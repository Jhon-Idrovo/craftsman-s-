import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useCollections, useProducts, useProduct } from "../../shopify/hooks";
import ShopCard from "../../components/ShopCard";
import ProductDetail from "../../components/ProductDetail";

import { useMutation } from "@apollo/client";

//-------------
import { Context } from "../../shopify/contex";
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
} from "../../shopify/checkout";

function Store() {
  const router = useRouter();
  // for the filter
  const [menuSection, setMenuSection] = useState("All");
  // for querying
  const [parentCollection, setParentCollection] = useState();
  const [childCollection, setChildCollection] = useState();
  const [productHandle, setProductHandle] = useState();

  const [parent, child, product] = router.query.params || []; //next.js runs this script twice, one without the params and one with them
  console.log(parent, child, product);

  useEffect(() => {
    setParentCollection(
      parent & !product ? decodeURIComponent(parent) : undefined
    );
    setChildCollection(
      child & !product ? decodeURIComponent(child) : undefined
    );
    setProductHandle(product);
  }, [parent, child, product]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isLoadingCollections, collections } = useCollections();
  const { isLoadingProducts, products } = useProducts(
    parentCollection ? parentCollection : menuSection,
    childCollection
  );
  //------------------------------------------------
  const { checkout, setCheckout } = useContext(Context);
  const [
    createCheckoutMutation,
    {
      data: createCheckoutData,
      loading: createCheckoutLoading,
      error: createCheckoutError,
    },
  ] = useMutation(createCheckout);

  const [
    lineItemAddMutation,
    {
      data: lineItemAddData,
      loading: lineItemAddLoading,
      error: lineItemAddError,
    },
  ] = useMutation(checkoutLineItemsAdd);

  useEffect(() => {
    const variables = { input: {} };
    createCheckoutMutation({ variables }).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log("create checkout error", err);
      }
    );
  }, []);

  useCheckoutEffect(createCheckoutData, "checkoutCreate", setCheckout);
  useCheckoutEffect(lineItemAddData, "checkoutLineItemsAdd", setCheckout);

  const addVariantToCart = (variantId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ variantId, quantity: parseInt(quantity, 10) }],
    };
    // TODO replace for each mutation in the checkout thingy. can we export them from there???
    // create your own custom hook???

    lineItemAddMutation({ variables }).then((res) => {
      // to signal the customer that the item was added
      setCartOpen(true);
    });
  };

  return (
    <main>
      <section className="shop-header">
        <h1 className="landing-title">Our Designs Inspires You</h1>
      </section>
      <section>
        <button
          className="filter-btn"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          FILTER
          <p
            className={`filter-icon ${
              isFilterOpen ? "filter-icon-open" : null
            }`}
          >
            +
          </p>
        </button>

        <div className={`filter-container  ${isFilterOpen ? "open" : null}`}>
          <ul className="filter-list">
            {isLoadingCollections
              ? null
              : Object.keys(collections).map((key) => {
                  return (
                    <li
                      className={`filter-item ${
                        key === menuSection ? "active" : null
                      }`}
                      onClick={() => {
                        setMenuSection(key);
                        setParentCollection(key);
                        setChildCollection(undefined);
                      }}
                    >
                      {key}{" "}
                      {key === menuSection ? (
                        <i className="fas fa-arrow-circle-right mr-1 filter-item-icon"></i>
                      ) : null}
                    </li>
                  );
                })}
          </ul>

          <ul className="filter-options">
            {isLoadingCollections
              ? null
              : menuSection
              ? collections[menuSection].map((option) => {
                  return (
                    <li
                      className="filter-item"
                      onClick={() => {
                        setParentCollection(menuSection);
                        setChildCollection(option);
                        setProductHandle(undefined);
                      }}
                    >
                      {option}
                    </li>
                  );
                })
              : null}
            {menuSection !== "All" && (
              <li
                className="filter-item"
                onClick={() => {
                  // All the producst from the category
                  setParentCollection(menuSection);
                  setChildCollection(undefined);
                  setProductHandle(undefined);
                }}
              >
                All
              </li>
            )}
          </ul>
        </div>
      </section>
      {productHandle ? (
        <ProductDetail
          productHandle={productHandle}
          addVariantToCart={addVariantToCart}
        />
      ) : (
        <section className="product-grid">
          {isLoadingProducts
            ? null
            : products.map((product) => (
                <ShopCard
                  imgSrc={product.images[0].src}
                  title={product.title}
                  price={product.variants[0].price}
                  setProduct={setProductHandle}
                  handle={product.handle}
                />
              ))}
        </section>
      )}
    </main>
  );
}

export default Store;
