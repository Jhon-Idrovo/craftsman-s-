import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

import { useCollections } from "../shopify/hooks";
//------------
import { Context } from "../shopify/contex";
import {
  useCheckoutEffect,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
} from "../shopify/checkout";

import { useMutation } from "@apollo/client";
import Cart from "./Cart";

function NavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [section, setSection] = useState("Mouse/Desk Pads");
  const router = useRouter();
  const { isLoadingCollections, errorCollections, collections } =
    useCollections();

  //---------------------------
  const { checkout, setCheckout } = useContext(Context);

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
    <nav className="flex justify-between items-center relative h-12 border-b-2 border-txt-base border-opacity-50">
      <Link href="/">
        <a className=" font-bold text-xl ml-2">CRAFTSMAN'S</a>
      </Link>
      <div className="flex items-center">
        <ul className={`nav-menu ${isMenuOpen ? "open" : null}`}>
          <li className="nav-menu-item">
            <Link href="/shop">
              <a className="">Shop </a>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link href="/newsletter">
              <a className="">Newsletter </a>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link href="/about">
              <a className="w-max">Our Story </a>
            </Link>
          </li>
        </ul>

        <button
          className="m-2 relative pr-4"
          onClick={() => setIsCartOpen(true)}
        >
          Cart
          <p
            className={`absolute top-0 right-0 w-4 text-xs rounded-full bg-secondary  ${
              checkout.lineItems.edges.length > 0 ? "" : "hidden"
            }`}
          >
            {checkout.lineItems.edges.length}
          </p>
        </button>
        <Cart
          removeLineItemInCart={removeLineItemInCart}
          updateLineItemInCart={updateLineItemInCart}
          checkout={checkout}
          isCartOpen={isCartOpen}
          handleCartClose={() => {
            setIsCartOpen(false);
          }}
          customerAccessToken={""}
        />
        <div
          className="w-6 h-6 my-auto mr-2 overflow-hidden hamburger-cont"
          onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
        >
          <div className={`hamburger ${isMenuOpen ? "active" : null}`}></div>
        </div>
      </div>
    </nav>
  );
  return (
    <nav className="nav-bar z-10">
      <div className="nav-menu">
        <input type="checkbox" name="" id="menu-check" />
        <div className="hamburger"></div>
        <div className="menu-container">
          <ul className="nav-list">
            <li>
              <label className="menu-item ">Shop</label>

              <ul className="nav-sublist">
                {isLoadingCollections
                  ? null
                  : Object.keys(collections).map((key) => {
                      return (
                        <li
                          className="menu-item"
                          onClick={() => setSection(key)}
                        >
                          {key}{" "}
                          {key === section ? (
                            <i className="fas fa-arrow-circle-right"></i>
                          ) : null}
                        </li>
                      );
                    })}
              </ul>
            </li>
            <li>
              <Link href="/about">
                <a className="menu-item">About</a>
              </Link>
            </li>
            <li>
              <Link href="/journal">
                <a className="menu-item">Journal</a>
              </Link>
            </li>
            <li>
              <Link href="/Cart">
                <a className="menu-item">Cart</a>
              </Link>
            </li>
          </ul>
          <ul className="nav-options">
            {isLoadingCollections
              ? null
              : collections[section].map((childCollection) => {
                  return (
                    <li
                      className="menu-item"
                      onClick={() =>
                        router.push(
                          `/shop/${encodeURIComponent(
                            section
                          )}/${encodeURIComponent(childCollection)}`
                        )
                      }
                    >
                      {childCollection}
                    </li>
                  );
                })}
            <li
              className="menu-item"
              onClick={() =>
                router.push(`/shop/${encodeURIComponent(section)}`)
              }
            >
              All
            </li>
          </ul>
        </div>
      </div>
      <Link href="/">
        <a className="logo">GROVE</a>
      </Link>
      <button onClick={() => setIsCartOpen(true)}>Cart</button>
      <Cart
        removeLineItemInCart={removeLineItemInCart}
        updateLineItemInCart={updateLineItemInCart}
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={() => {
          setIsCartOpen(false);
        }}
        customerAccessToken={""}
      />
    </nav>
  );
}

export default NavBar;
