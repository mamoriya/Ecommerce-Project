import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, totalPrice, totalItems } = useCart();

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: "20px",
        padding: "30px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #dee2f3, #ffffff)",
      }}
    >
      <h2
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "30px",
        }}
      >
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px 20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: "18px", color: "#888" }}>Your cart is empty</p>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "16px 20px",
                borderRadius: "12px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "60px", height: "70px", objectFit: "contain", flexShrink: 0 }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </div>
                <div style={{ color: "#764ba2", fontWeight: "bold", fontSize: "15px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                  {item.quantity > 1 && (
                    <span style={{ color: "#aaa", fontWeight: 400, fontSize: "12px", marginLeft: "6px" }}>
                      (${item.price} × {item.quantity})
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={qtyBtnStyle}
                >
                  −
                </button>
                <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 600 }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQty(item.id)}
                  style={qtyBtnStyle}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "8px 14px",
                  background: "linear-gradient(135deg, #ff4b2b, #ff416c)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              marginTop: "24px",
              backgroundColor: "#ffffff",
              padding: "20px 24px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ margin: "0 0 8px", color: "#555" }}>Total Items: <strong>{totalItems}</strong></p>
            <p style={{ margin: 0, fontSize: "18px", color: "#764ba2", fontWeight: "bold" }}>
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const qtyBtnStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  border: "1.5px solid #ddd",
  background: "#f5f5f5",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

export default Cart;