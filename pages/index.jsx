import Head from "next/head";
import Link from "next/link";

import CarouselWithProducts from "../components/CarouselWithProducts";
import { useProducts } from "../shopify/hooks";

export default function Home() {
  const images = [
    {
      url: "https://assets.website-files.com/5faabe4b6f6b4331a5f27952/603fa29994675e4e5487a831_Hero_Original-min-p-500.png",
      desc: "description",
    },
  ];

  const { isLoadingProducts, products } = useProducts("Stands");

  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>
      <main>
        <section>
          <div className="img-section-1 flex flex-col items-center justify-center text-white">
            <h1 className="landing-title">The Desk System You Deserve </h1>
            <p className="mt-4">Available in Walnut or Maple</p>
            <Link href="/">
              <a className="CTA mt-4">SEE MORE</a>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mt-12">
            <h2 className="landing-title">Design Inspires</h2>
            <p className="mt-4 text-center">
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
          <div className="">
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
            <h3 className="landing-title">Selected Products</h3>
            <p className="my-4">See Our Costumers' Most Loved Products</p>
          </div>
          {isLoadingProducts ? null : (
            <CarouselWithProducts products={products} />
          )}
        </section>

        <section className="mt-12">
          <div className="img-section-2 flex flex-col justify-center items-center text-white p-4">
            <h3 className="landing-title">Working From Home</h3>
            <p className="mt-4 text-center">
              Now working from home can be a luxury experience
            </p>
            <button className="CTA mt-4 ">SEE MORE</button>
          </div>
        </section>
        <section className="flex flex-col justify-center items-center mt-12">
          <h1 className="landing-title">Made The Good Way</h1>
          <p className="mt-4 text-center mx-12">
            Our signature craftsmanship has been honed over a decade of
            manufacturing innovation here in Portland, Oregon. We combine the
            skills of our small in-house team with the collective strength of
            collaborators throughout the US to deliver quality products worth
            investing in.
          </p>
          <video className="mt-4" controls>
            <source src="https://i.vimeocdn.com/video/932487191_640" />
            Your browser does not support the video
          </video>
        </section>
        <section className="flex flex-col justify-center items-center mt-12">
          <h1 className="text-5xl font-semibold text-center">
            Working For The Meaning
          </h1>
          <p className="text-center mt-4 mx-12">
            We're here because we believe that your work deserves the best. A
            team that loves working together is the magic that makes it all
            happen.
          </p>
          <button className="CTA mt-4">KNOW OUR STORY</button>
        </section>
      </main>
    </>
  );
}
