//import Carousel from "../components/Carousel";
import { useCollections, useProducts } from "../shopify/hooks";
function Tests() {
  const { isLoadingProducts, products } = useProducts("Stands"); //this should be another collection with more meaning
  const slideMappingFn = (productInfo) => {
    return (
      <Card
        imgSrc={productInfo.images[0].src}
        title={productInfo.title}
        price={productInfo.variants[0].price}
      />
    );
  };
  return (
    <div>
      <Carousel
        slides={products}
        slideMappingFn={slideMappingFn}
        slideWidth={300}
      />
    </div>
  );
}

export default Tests;

import { useEffect, useState, useRef } from "react";
import Card from "./../components/Card";
//import { useProducts } from "../shopify/hooks";

function Carousel({ slides, slideMappingFn, slideWidth }) {
  const [slide, setSlide] = useState(Math.floor(slides.length / 2));
  const [imagesPerSlide, setimagesPerSlide] = useState();

  const parentEl = useRef(null);

  useEffect(() => {
    console.log(parentEl.current);
    setimagesPerSlide(Math.floor(parentEl.current.offsetWidth / slideWidth));
    const resize = () =>
      setimagesPerSlide(Math.floor(parentEl.current.offsetWidth / slideWidth));
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="bg-primary " id="carousel-container" ref={parentEl}>
      {/* images have a max-width of 250px */}

      <div className={`grid grid-cols-${imagesPerSlide} relative grid-rows-1`}>
        {imagesPerSlide
          ? slides
              .slice(
                slide,
                slide + imagesPerSlide //if this is more than the legth of the array it does not matter because slice will take the elements it can
              )
              .map(slideMappingFn)
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

//export default Carousel;
