import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <div
      style={{
        minHeight: "100vh",
        margin:"20px",
        padding: "30px",
        borderRadius:"20px",
        background: "linear-gradient(135deg, #dee2f3, #ffffff)"
      }}
    >
      <h2
        style={{
          background: "linear-gradient(135deg, #ffffff, #f3f3f3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "30px"
        }}
      >
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
          }}
        >
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#f5efef",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
            >
              <div
                style={{
                  flex: 1,
                  marginRight: "20px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontWeight: 500
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontWeight: "bold",
                  color: "#764ba2",
                  marginRight: "20px"
                }}
              >
                ${item.price}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "8px 15px",
                  background: "linear-gradient(135deg, #ff4b2b, #ff416c)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#f5efef",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
            }}
          >
            <h3>Total Items: {totalItems}</h3>
            <h3 style={{ color: "#764ba2" }}>
              Total Price: ${totalPrice.toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;