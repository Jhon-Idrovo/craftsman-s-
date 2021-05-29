import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useCollections, useProducts, useProduct } from "../../shopify/hooks";
import ShopCard from "../../components/ShopCard";
import ProductDetail from "../../components/ProductDetail";

import { useMutation } from "@apollo/client";
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
} from "../../shopify/checkout";

import { Context } from "../../shopify/contex";

function Store() {
  const router = useRouter();
  const [menuSection, setMenuSection] = useState();
  const [parentCollection, setParentCollection] = useState();
  const [childCollection, setChildCollection] = useState();
  const [productHandle, setProductHandle] = useState();

  useEffect(() => {
    const [parent, child, product] = router.query.params || []; //next.js runs this script twice, one without the params and one with them
    console.log(parent, child, product);
    setParentCollection(parent ? decodeURIComponent(parent) : undefined);
    setChildCollection(child ? decodeURIComponent(child) : undefined);
    setProductHandle(product);
  }, []);

  const { isLoadingCollections, collections } = useCollections();
  const { isLoadingProducts, products } = useProducts(
    parentCollection ? parentCollection : "Mouse/Desk Pads",
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

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const addVariantToCart = (variantId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ variantId, quantity: parseInt(quantity, 10) }],
    };
    // TODO replace for each mutation in the checkout thingy. can we export them from there???
    // create your own custom hook???

    lineItemAddMutation({ variables }).then((res) => {
      //setCartOpen(true);
    });
  };

  return (
    <main>
      <section className="shop-header">
        <h1 className="landing-title">Our Designs Inspires You</h1>
      </section>
      <section>
        <div className="filter-container">
          <label htmlFor="filter-check" className="font-semibold">
            FILTER
          </label>
          <input type="checkbox" name="filter" id="filter-check" />
          <div className="filter-expand-icon"></div>
          <div className="filter-menu-container">
            <ul className="nav-sublist filter-sublist">
              {isLoadingCollections
                ? null
                : Object.keys(collections).map((key) => {
                    return (
                      <li
                        className="menu-item"
                        onClick={() =>
                          setMenuSection(key) & setChildCollection(undefined)
                        }
                      >
                        {key}{" "}
                        {key === menuSection ? (
                          <i className="fas fa-arrow-circle-right"></i>
                        ) : null}
                      </li>
                    );
                  })}
            </ul>

            <ul className="nav-options">
              {isLoadingCollections
                ? null
                : menuSection
                ? collections[menuSection].map((option) => {
                    return (
                      <li
                        className="menu-item"
                        onClick={() => {
                          setParentCollection(menuSection);
                          setChildCollection(option);
                        }}
                      >
                        {option}
                      </li>
                    );
                  })
                : null}
              <li
                className="menu-item"
                onClick={() => setParentCollection(menuSection)}
              >
                All
              </li>
            </ul>
          </div>
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
