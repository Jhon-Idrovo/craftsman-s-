function Card({ url, description, price }) {
  return (
    <div className=" m-4 flex flex-col items-center justify-between bg-base ">
      <img src={url} alt={description} className="carrousel-img" />
      <div>
        <h3 className="text-lg">{description}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
}

export default Card;
