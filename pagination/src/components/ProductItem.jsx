import React from 'react'

const ProductItem = ({id, title, price, thumbnail}) => {
  return (
    <div style={{width: "300px", height: "300px", border: "1px solid black", margin: '10px', padding: "10px"}}>
        <img src={thumbnail} alt={title ?? "product-img"} width={250} height={250}/>
        <div style={{width: '100%', display: "flex", justifyContent: "space-between"}}>
            <span>{title}</span>
            <span>${price}</span>
        </div>
    </div>
  )
}

export default ProductItem