function ShopCard({ imgSrc, title, price, setProduct }) {
  return (
    <div
      className=" m-4 flex flex-col items-center justify-between cursor-pointer border-2 border-primary bg-primary hover:border-txt-base "
      onClick={() => setProduct(title)}
    >
      <img src={imgSrc} alt={title} className="carrousel-img mt-4" />
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
}

export default ShopCard;
