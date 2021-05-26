import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useProducts } from "../shopify/hooks";

function Carousel({ slides }) {
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const [slide, setSlide] = useState(3);
  const [imagesPerSlide, setimagesPerSlide] = useState();
  useEffect(() => {
    const imageWidth = 300;
    setimagesPerSlide(Math.floor(window.innerWidth / imageWidth));
    const resize = () =>
      setimagesPerSlide(Math.floor(window.innerWidth / imageWidth));
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="bg-primary ">
      {/* images have a max-width of 250px */}

      <div className={`grid grid-cols-${imagesPerSlide} relative grid-rows-1`}>
        {imagesPerSlide
          ? isLoadingProducts
            ? null
            : products
                .slice(
                  slide,
                  slide + imagesPerSlide //if this is more than the legth of the array it does not matter because slice will take the elements it can
                )
                .map((productInfo) => {
                  return (
                    <Card
                      imgSrc={productInfo.images[0].src}
                      title={productInfo.title}
                      price={productInfo.variants[0].price}
                    />
                  );
                })
          : null}
        <i
          className={`fas fa-angle-left absolute top-1/2 bottom-1/2 left-2 text-4xl ${
            slide == 0 ? "hidden" : null
          }`}
          onClick={() => setSlide((prevValue) => prevValue - 1)}
        ></i>
        <i
          className={`fas fa-angle-right absolute top-1/2 bottom-1/2 right-2 text-4xl ${
            slide + imagesPerSlide >= slides.length ? "hidden" : null
          }`}
          onClick={() => setSlide((prevValue) => prevValue + 1)}
        ></i>
      </div>
    </div>
  );
}

export default Carousel;
