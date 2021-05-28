function ShopCard({ imgSrc, title, price }) {
  return (
    <div className=" m-4 flex flex-col items-center justify-between bg-primary ">
      <img src={imgSrc} alt={title} className="carrousel-img mt-4" />
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
}

export default ShopCard;
