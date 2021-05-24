import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Menu from "../components/Menu";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="nav-bar z-50">
      <div className="nav-menu">
        <input
          type="checkbox"
          name=""
          id="menu-check"
          value={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
        <div className="hamburger"></div>
        <div
          className="absolute top-10 -left-8 menu-toggler"
          style={{ maxHeight: isOpen ? "100vh" : 0 }}
        >
          <Menu>
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
          </Menu>
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
