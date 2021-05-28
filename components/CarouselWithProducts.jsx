import Carousel from "./Carousel";
import Card from "./Card";

function CarouselWithProducts({ products }) {
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

export default CarouselWithProducts;
