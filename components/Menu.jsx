import { useState } from "react";

import Link from "next/link";
import { useCollections } from "../shopify/hooks";
function Menu({ children }) {
  const [section, setSection] = useState("Mouse/Desk Pads");
  const { isLoadingCollections, collections } = useCollections();
  return (
    <div className="menu-container">
      <ul className="nav-list">
        <li>
          <label className="menu-item ">Shop</label>

          <ul className="nav-sublist">
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
        </li>
        {children}
      </ul>
      <ul className="nav-options">
        {isLoadingCollections
          ? null
          : collections[section].map((option) => {
              return <li className="menu-item">{option}</li>;
            })}
      </ul>
    </div>
  );
}

export default Menu;
