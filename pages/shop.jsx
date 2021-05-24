import { useState } from "react";
import ShopFilter from "../components/ShopFilter";
import { CATEGORIES } from "../lib/store";
function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main>
      <section className="shop-header">
        <h1 className="landing-title">Our Designs Inspires You</h1>
      </section>

      <div className="filter-container">
        <label htmlFor="filter-check" className="font-semibold">
          FILTER
        </label>
        <input
          type="checkbox"
          name="filter"
          id="filter-check"
          value={isFilterOpen}
          onChange={() => setIsFilterOpen((prev) => !prev)}
        />
        <div className="filter-expand-icon"></div>
      </div>
    </main>
  );
}

export default Shop;
