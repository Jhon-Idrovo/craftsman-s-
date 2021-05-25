import { useState } from "react";
import { CATEGORIES } from "../lib/store";
function Shop() {
  const [section, setSection] = useState("Mouse/Desk Pads");

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
            {Object.keys(CATEGORIES).map((key) => {
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
            {CATEGORIES[section].map((option) => {
              return <li className="menu-item">{option}</li>;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Shop;
