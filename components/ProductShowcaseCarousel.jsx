import { useState } from "react"

function ProductShowcaseCarousel({imgs}) {
    const [mainImg, setMainImg] = useState(0)
    return (
        <div>
            <img src={mainImg} alt="" />
            <div>
                {imgs.map(img=>)}
            </div>
        </div>
    )
}

export default ProductShowcaseCarousel
