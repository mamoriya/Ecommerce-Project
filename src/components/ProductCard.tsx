import React from 'react'
import { Product } from "../types/Product";
import { Link } from 'react-router-dom'

interface Props{
    product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <>
            <div style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "#fff"
            }}>
                <img src={product.image} alt={product.title}
                    style={{
                        width: "100px",
                        height: "120px",
                        objectFit: "contain"
                    }}
                />
                <h3 style={{ fontSize: "14px" }}>{product.title}</h3>
                <p style={{ fontWeight: "bold" }}>{product.price}</p>
                <Link to={`/product/${product.id}`}>
                    View Details
                </Link>
            </div>
        </>
    )
}

export default ProductCard