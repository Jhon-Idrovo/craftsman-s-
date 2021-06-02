import { useRouter } from "next/router";

function Card({ imgSrc, title, price, handle }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/shop/n/n/${handle}`)}
      className="overflow-hidden m-4 flex flex-col items-center justify-between bg-base "
    >
      <img src={imgSrc} alt={title} className="carrousel-img" />
      <div>
        <h3 className="text-lg px-2">{title}</h3>
        <p className="text-sm px-2">${price}</p>
      </div>
    </div>
  );
}

export default Card;
