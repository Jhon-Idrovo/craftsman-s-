import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollections, useProducts } from "../../shopify/hooks";
import ShopCard from "../../components/ShopCard";

function Store() {
  const router = useRouter();
  const [parentCollection, setParentCollection] = useState();
  const [childCollection, setChildCollection] = useState();
  const [productID, setProductID] = useState();

  useEffect(() => {
    const [parent, child, product] = router.query.params || []; //next.js runs this script twice, one without the params and one with them
    console.log(parent, child, product);
    setParentCollection(decodeURIComponent(parent));
    setChildCollection(decodeURIComponent(child));
    setProductID(product);
  });

  const { isLoadingCollections, collections } = useCollections();
  const { isLoadingProducts, products } = useProducts(
    parentCollection ? parentCollection : "Mouse/Desk Pads",
    childCollection
  );

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
                        onClick={() => setParentCollection(key)}
                      >
                        {key}{" "}
                        {key === parentCollection ? (
                          <i className="fas fa-arrow-circle-right"></i>
                        ) : null}
                      </li>
                    );
                  })}
            </ul>

            <ul className="nav-options">
              {isLoadingCollections
                ? null
                : parentCollection
                ? collections[parentCollection].map((option) => {
                    return <li className="menu-item">{option}</li>;
                  })
                : null}
            </ul>
          </div>
        </div>
      </section>
      <section className="product-grid">
        {isLoadingProducts
          ? null
          : products.map((product) => (
              <ShopCard
                imgSrc={product.images[0].src}
                title={product.title}
                price={product.variants[0].price}
              />
            ))}
      </section>
    </main>
  );
}

export default Store;
