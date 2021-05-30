import { useState } from "react";
import CarouselWithImgs from "../components/CarouselWithImgs";

function ProductShowcaseCarousel({ imgs }) {
  const [mainImg, setMainImg] = useState(imgs[0]);
  return (
    <div>
      <img className="mx-auto" src={mainImg} alt="" />
      <CarouselWithImgs imgs={imgs} handleClick={setMainImg} />
    </div>
  );
}

export default ProductShowcaseCarousel;
