import { useEffect, useState, useRef } from "react";

function Carousel({ slides, slideMappingFn, slideWidth }) {
  const [slide, setSlide] = useState(Math.floor(slides.length / 2));
  const [imagesPerSlide, setimagesPerSlide] = useState();

  const parentEl = useRef(null);

  useEffect(() => {
    console.log(parentEl.current);
    //using a reference to get the widht of the parent element and set a listener to update on a resize event
    setimagesPerSlide(Math.floor(parentEl.current.offsetWidth / slideWidth));
    const resize = () =>
      setimagesPerSlide(Math.floor(parentEl.current.offsetWidth / slideWidth));
    //the only element that has a resize event is the window
    window.addEventListener("resize", resize);
    //remove the listener to avoid wasting memory
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="bg-primary " id="carousel-container" ref={parentEl}>
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

export default Carousel;
