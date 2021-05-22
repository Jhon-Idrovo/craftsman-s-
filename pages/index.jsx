import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Card from "../components/Card";
import Carrousel from "../components/Carrousel";

const slidesTest = [
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fpen-black-gridA-A1.jpg%3F_v%3D1565817973.02?auto=format&ixlib=python-1.1.2&w=300&s=ebda13595432be3088e37b00fc03bac7",
    description: "Black Pen",
    price: 60,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fwalnut-desk-collection-desk-pad-XL-A4.jpg%3F_v%3D1588885791.89?auto=format&ixlib=python-1.1.2&w=300&s=fe9cf0d738945b62fee658357596a65f",
    description: "Wool Felt Desk Pad",
    price: 60,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fwalnut-succulent-planter-tall-2020-grid-A1.jpg%3F_v%3D1606095599.68?auto=format&ixlib=python-1.1.2&w=300&s=5a59d00eff69ecfb1d4ae1f61bd3a3f7",
    description: "Wood Planter",
    price: 50,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fwalnut-pen-cup-2020-grid-A1.jpg%3F_v%3D1606095722.2?auto=format&ixlib=python-1.1.2&w=300&s=3a5626f5d8b3de6b6994d1c34f901083",
    description: "Wood Pen Cup",
    price: 50,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fpen-black-gridA-A1.jpg%3F_v%3D1565817973.02?auto=format&ixlib=python-1.1.2&w=300&s=ebda13595432be3088e37b00fc03bac7",
    description: "Walnut Magsafe Stand",
    price: 60,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Fwalnut-headphone-stand-grid-A1.jpg%3F_v%3D1561076419.35?auto=format&ixlib=python-1.1.2&w=300&s=72bb04397bc34eea82744128aef61574",
    description: "Walnut Headphone Stand",
    price: 60,
  },
  {
    url: "https://grovemade.imgix.net/https%3A%2F%2Fgrovemade.com%2Fshop-static%2Fshop%2Fvariant%2Ftall-laptop-stand-walnut-gridA-A2.jpg%3F_v%3D1602535081.79?auto=format&ixlib=python-1.1.2&w=300&s=775bea9eb3fc10ed8e3b1f11315ec200",
    description: "Walnut Laptop Raiser",
    price: 60,
  },
];

export default function Home() {
  const images = [
    {
      url: "https://assets.website-files.com/5faabe4b6f6b4331a5f27952/603fa29994675e4e5487a831_Hero_Original-min-p-500.png",
      desc: "description",
    },
  ];
  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>
      <main>
        <section>
          <div className="img-section-1 flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-semibold text-center">
              The Desk System You Deserve{" "}
            </h1>
            <p className="mt-4">Available in Walnut or Maple</p>
            <Link href="/">
              <a className="CTA mt-4">SEE MORE</a>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mt-12">
            <h2 className="text-5xl font-semibold">Design Inspires</h2>
            <p className="mt-4">
              Build your dream workspace, so you can get your best work done
            </p>
            <Link href="/">
              <a className="CTA mt-4">GET STARTED</a>
            </Link>
          </div>
        </section>
        <section className="featured-collections mt-12">
          <div>
            <img
              src="https://grovemade.imgix.net/https%3A%2F%2Fsiteleaf.grovemade.com%2Fuploads%2Fgrovemade-black-leather-desk-pad-xl-galB-A4.jpg?auto=format&ixlib=python-1.1.2&w=900&s=66fa33ce86e90c68262ffb18a20c00c6"
              alt="Desk Pads"
            />
            <h4>Desk Pads</h4>
            <p className="CTA mt-2 table mx-auto">SEE MORE</p>
          </div>
          <div className="mt-12">
            <img
              src="https://grovemade.imgix.net/https%3A%2F%2Fsiteleaf.grovemade.com%2Fuploads%2Ftall-laptop-stand-walnut-galB-C1.jpg?auto=format&ixlib=python-1.1.2&w=900&s=55cc515785b01d6e3b05b26389fa3c7d"
              alt=""
            />
            <h4>Laptop Stands</h4>
            <p className="CTA mt-2 table mx-auto">SEE MORE</p>
          </div>
        </section>
        <section className="mt-12 mb-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-5xl font-semibold">Selected Products</h3>
            <p className="mt-4">See Our Costumers' Most Loved Products</p>
          </div>
          <Carrousel slides={slidesTest} />
        </section>

        <section className="mt-12">
          <div className="img-section-2 flex flex-col justify-center items-center text-white">
            <h3 className="text-5xl font-semibold text-center">
              Working From Home
            </h3>
            <p className="mt-4">
              Now working from home can be a luxury experience
            </p>
            <button className="CTA mt-4 ">SEE MORE</button>
          </div>
        </section>
      </main>
    </>
  );
}
