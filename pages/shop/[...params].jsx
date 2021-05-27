import { useRouter } from "next/router";
import { useState } from "react";
import { useCollections, useProducts } from "../../shopify/hooks";
function Store() {
  const router = useRouter();

  const [parentCollection, childCollection, productID] =
    router.query.params || []; //next.js runs this script twice, one without the params and one with them
  console.log(parentCollection, childCollection, productID);

  const [section, setSection] = useState("Mouse/Desk Pads");
  const { isLoadingCollections, collections } = useCollections();
  const [queryProducts, setQueryProducts] = useState("");
  // const {} = parentCollection
  //   ? useProducts(parentCollection, childCollection)
  //   : {};
  return (
    <main>
      <section className="shop-header">
        <h1 className="landing-title">Our Designs Inspires You</h1>
      </section>

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
                    <li className="menu-item" onClick={() => setSection(key)}>
                      {key}{" "}
                      {key === section ? (
                        <i className="fas fa-arrow-circle-right"></i>
                      ) : null}
                    </li>
                  );
                })}
          </ul>

          <ul className="nav-options">
            {isLoadingCollections
              ? null
              : collections[section].map((option) => {
                  return <li className="menu-item">{option}</li>;
                })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Store;
