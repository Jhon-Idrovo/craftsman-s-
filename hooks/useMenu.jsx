import { useState } from "react";
import { CATEGORIES } from "../lib/store";

const useMenu = () => {
  const [section, setSection] = useState("Mouse/Desk Pads");
  const Menu = (
    <div className="menu-container">
      <ul className="nav-list">
        <li>
          <label className="menu-item ">Shop</label>

          <ul className="nav-sublist">
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
        {CATEGORIES[section].map((option) => {
          return <li className="menu-item">{option}</li>;
        })}
      </ul>
    </div>
  );
  return { selection, menu };
};

export default useMenu;
