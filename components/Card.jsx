function Card({ imgSrc, title, price }) {
  return (
    <div className=" m-4 flex flex-col items-center justify-between bg-base ">
      <img src={imgSrc} alt={title} className="carrousel-img" />
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
}

export default Card;
