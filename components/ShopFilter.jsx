import { useState } from "react";
import Menu from "../components/Menu";

function ShopFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <label htmlFor="filter-check">FILTER</label>
        <input
          type="checkbox"
          name="filter"
          id="filter-check"
          value={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="menu-toggler" style={{ maxHeight: isOpen ? "100vh" : 0 }}>
        <Menu></Menu>
      </div>
    </div>
  );
}

export default ShopFilter;
