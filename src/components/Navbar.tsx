import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = (path: string) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#4CAF50" : "#333",
    fontWeight: location.pathname === path ? "bold" : "500",
    margin: "0 15px",
    fontSize: "16px",
  });

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "#f6e3fe",
        borderRadius:"20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#4CAF50",
          }}
        >
          My Business
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div
          style={{
            display: "none",
            cursor: "pointer",
          }}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="nav-links"
        >
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>

          <Link to="/cart" style={linkStyle("/cart")}>
            Cart 🛒
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Link to="/" style={{ padding: "8px 0", textDecoration: "none", color: "#333" }}>
            Home
          </Link>
          <Link to="/cart" style={{ padding: "8px 0", textDecoration: "none", color: "#333" }}>
            Cart 🛒
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;