
import React, { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {

    const { addToCart } = useCart();

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const getProduct = async () => {
            if (!id) return;

            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error in the fetching the product:", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) return <h2>Loading the product</h2>;
    if (!product) return <h2>Sorrry Product i s not found</h2>

    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "20px auto",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            {/* Image Section */}
            <div
                style={{
                    flex: "1 1 300px",
                    textAlign: "center",
                }}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        width: "100%",
                        maxWidth: "350px",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </div>

            {/* Content Section */}
            <div
                style={{
                    flex: "1 1 400px",
                }}
            >
                <h2
                    style={{
                        fontSize: "24px",
                        marginBottom: "10px",
                        color: "#333",
                    }}
                >
                    {product.title}
                </h2>

                <p
                    style={{
                        fontSize: "16px",
                        color: "#666",
                        marginBottom: "15px",
                        lineHeight: "1.6",
                    }}
                >
                    {product.description}
                </p>

                <h3
                    style={{
                        fontSize: "22px",
                        color: "#4CAF50",
                        marginBottom: "20px",
                    }}
                >
                    ${product.price}
                </h3>

                <button
                    onClick={() => product && addToCart(product)}
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "0.3s ease",
                        width: "100%",
                        maxWidth: "200px",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#45a049")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4CAF50")
                    }
                >
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    )
}

export default ProductDetail