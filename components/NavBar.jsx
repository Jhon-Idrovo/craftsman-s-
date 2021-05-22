import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const CATEGORIES = {
  "Mouse/Desk Pads": ["Desk Pads", "Mouse Pads", "Coasters", "View All"],
  Stands: [
    "Desk Shelves",
    "Monitor Stands",
    "Laptop Stands",
    "Headphone Stands",
    "iPhone Docks",
    "iPhone Stands",
    "View All",
  ],
};
function NavBar() {
  const [section, setSection] = useState("Mouse/Desk Pads");
  const router = useRouter();

  return (
    <nav className="nav-bar">
      <div className="nav-menu">
        <input type="checkbox" name="" id="menu-check" />
        <div className="hamburger"></div>
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
      </div>
      <Link href="/">
        <a className="logo">GROVE</a>
      </Link>
      <Link href="/cart">
        <a className="cart">My Cart</a>
      </Link>
    </nav>
  );
}

export default NavBar;
