import Carousel from "./Carousel";

function CarouselWithImgs({ imgs, handleClick }) {
  const slideMappingFn = (imgSrc) => {
    return <img src={imgSrc} alt="" onClick={() => handleClick(imgSrc)} />;
  };
  return (
    <div>
      <Carousel
        slides={imgs}
        slideMappingFn={slideMappingFn}
        slideWidth={100}
        start={0}
      />
    </div>
  );
}

export default CarouselWithImgs;
