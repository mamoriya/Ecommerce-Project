import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import FilterBar from "../components/FilterBar";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../utils/api";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedSort = searchParams.get("sort") || "";

  // Fetch categories once
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // Fetch products when filters or sort changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const sortQuery = selectedSort ? `?sort=${selectedSort}` : "";

      try {
        if (selectedCategories.length === 0) {
          const response = await fetch(
            `https://fakestoreapi.com/products${sortQuery}`
          );
          const data = await response.json();
          setProducts(data);
        } else {
          const responses = await Promise.all(
            selectedCategories.map((cat) =>
              fetch(
                `https://fakestoreapi.com/products/category/${cat}${sortQuery}`
              ).then((res) => res.json())
            )
          );

          setProducts(responses.flat());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      setLoading(false);
    };

    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((c) => c !== category);
    } else {
      updatedCategories.push(category);
    }

    const params = new URLSearchParams();

    updatedCategories.forEach((cat) =>
      params.append("category", cat)
    );

    if (selectedSort) {
      params.set("sort", selectedSort);
    }

    setSearchParams(params);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    setSearchParams(params);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      {/* <h1>Products</h1> */}

      <FilterBar
        categories={categories}
        selectedCategories={selectedCategories}
        selectedSort={selectedSort}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #dee2f3, #ffffff)"
        }}
      >
        <h1
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            marginBottom: "30px"
          }}
        >
          Products
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "25px"
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#f5efef",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "120px",
                  height: "140px",
                  objectFit: "contain",
                  margin: "0 auto 15px auto"
                }}
              />

              {/* Title with overflow handling */}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {product.title}
              </div>

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#764ba2",
                  marginBottom: "15px"
                }}
              >
                ${product.price}
              </div>

              <a
                href={`/product/${product.id}`}
                style={{
                  padding: "8px 15px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "14px"
                }}
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;