import React from "react";
import Link from "next/link";

const footerList = [
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Journal", link: "/journal" },
  { name: "Support", link: "/support" },
  { name: "COVID-19 Info", link: "cv-info" },
  { name: "Order Status", link: "/order-status" },
  { name: "Corporate Sales", link: "/corp-sales" },
];
function Footer() {
  return (
    <footer className="footer-container">
      <span className="p-2">
        <ul className="">
          {footerList.map((el) => (
            <li className="mb-2 font-medium	">
              <Link href={el.link}>
                <a>{el.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </span>
      <span className="p-2">
        <h4 className="text-3xl">Newsletter Singup</h4>
        <p className="mt-4 mr-4">
          Want to be one of the first to use our products? Maybe win a premium
          gift? We communicate great thing througth our newsletter
        </p>
        <form>
          <input
            className="pl-2 mt-4"
            type="email"
            name="email"
            id="newsletter-email"
            placeholder="Your Email Here"
          />
          <button type="submit" className="CTA ">
            SUBMIT
          </button>
        </form>
      </span>
    </footer>
  );
}

export default Footer;
