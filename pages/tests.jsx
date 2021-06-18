//import Carousel from "../components/Carousel";
import { useCollections, useProducts, useProduct } from "../shopify/hooks";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from "../shopify/checkout";
import Loading from "../components/Loading";

// import Product from './components/Product';
// import CustomerAuthWithMutation from './components/CustomerAuth';

function Tests() {
  const { isLoadingProducts, products } = useProducts("Stands");
  //products = [{images:[{src:'url'}], tittle:'', variants: [{price:}], handle:''}]

  const [checkout, setCheckout] = useState({ lineItems: { edges: [] } });

  //SHOP
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
      //setCartOpen(true);
    });
  };

  //CART
  const [isCartOpen, setCartOpen] = useState(false);

  const [
    lineItemUpdateMutation,
    {
      data: lineItemUpdateData,
      loading: lineItemUpdateLoading,
      error: lineItemUpdateError,
    },
  ] = useMutation(checkoutLineItemsUpdate);

  const [
    lineItemRemoveMutation,
    {
      data: lineItemRemoveData,
      loading: lineItemRemoveLoading,
      error: lineItemRemoveError,
    },
  ] = useMutation(checkoutLineItemsRemove);

  useCheckoutEffect(lineItemUpdateData, "checkoutLineItemsUpdate", setCheckout);
  useCheckoutEffect(lineItemRemoveData, "checkoutLineItemsRemove", setCheckout);
  const handleCartClose = () => {
    setCartOpen(false);
  };

  const updateLineItemInCart = (lineItemId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }],
    };
    lineItemUpdateMutation({ variables });
  };

  const removeLineItemInCart = (lineItemId) => {
    const variables = { checkoutId: checkout.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };

  return (
    <div className="App">
      <header className="App__header">
        {!isCartOpen && (
          <div className="App__view-cart-wrapper">
            <button
              className="App__view-cart"
              onClick={() => setCartOpen(true)}
            >
              Cart
            </button>
          </div>
        )}
      </header>
      <div className="Product-wrapper">
        {!isLoadingProducts ? console.log(products) : null}
        {isLoadingProducts ? null : products ? (
          <ProductDetail
            productHandle={products[0].handle}
            addVariantToCart={addVariantToCart}
          />
        ) : null}
      </div>
      <Cart
        removeLineItemInCart={removeLineItemInCart}
        updateLineItemInCart={updateLineItemInCart}
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        customerAccessToken={""}
      />
      <Loading>ljljlj</Loading>
    </div>
  );
}

export default Tests;
