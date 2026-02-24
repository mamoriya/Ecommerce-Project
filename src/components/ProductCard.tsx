import React from 'react'
import { Product } from "../types/Product";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div
            style={{
                backgroundColor: "#f5efef",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                height: "100%",
            }}
        >
            <img
                src={product.image}
                alt={product.title}
                style={{
                    width: "120px",
                    height: "140px",
                    objectFit: "contain",
                    margin: "0 auto 15px auto",
                }}
            />

            <div
                style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "8px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {product.title}
            </div>

            <div
                style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#764ba2",
                    marginBottom: "14px",
                }}
            >
                ${product.price}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
                <Link
                    to={`/product/${product.id}`}
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: "13px",
                        textAlign: "center",
                    }}
                >
                    View Details
                </Link>

                <button
                    onClick={() => addToCart(product)}
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        background: "linear-gradient(135deg, #4CAF50, #45a049)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;