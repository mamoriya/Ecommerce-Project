import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  categories: string[];
  selectedCategories: string[];
  selectedSort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const containerStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e8e8e8",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "28px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  display: "flex",
  flexWrap: "wrap",
  gap: "32px",
  alignItems: "flex-start",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#888",
  marginBottom: "14px",
  marginTop: 0,
};

const categoryChipStyle = (selected: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 14px",
  borderRadius: "999px",
  border: `1.5px solid ${selected ? "#6366f1" : "#e0e0e0"}`,
  background: selected ? "#eef2ff" : "#fafafa",
  color: selected ? "#4f46e5" : "#555",
  fontWeight: selected ? 600 : 400,
  fontSize: "14px",
  cursor: "pointer",
  userSelect: "none",
  transition: "border-color 0.15s, background 0.15s, color 0.15s",
  outline: "none",
});

const checkmarkStyle: React.CSSProperties = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#4f46e5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const selectStyle: React.CSSProperties = {
  padding: "8px 36px 8px 14px",
  borderRadius: "10px",
  border: "1.5px solid #e0e0e0",
  background: "#fafafa",
  fontSize: "14px",
  color: "#333",
  fontWeight: 500,
  cursor: "pointer",
  outline: "none",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  transition: "border-color 0.15s",
};

const FilterBar: React.FC<Props> = ({
  categories,
  selectedCategories,
  selectedSort,
  onCategoryChange,
  onSortChange,
}) => {
  const [selectFocused, setSelectFocused] = useState(false);
  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Category Filter */}
      <div style={{ flex: "1 1 280px" }}>
        <p style={sectionTitleStyle}>Filter by Category</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <AnimatePresence>
            {categories.map((category, i) => {
              const selected = selectedCategories.includes(category);
              return (
                <motion.button
                  key={category}
                  style={categoryChipStyle(selected)}
                  onClick={() => onCategoryChange(category)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 2px 8px rgba(99,102,241,0.15)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <AnimatePresence>
                    {selected && (
                      <motion.span
                        style={checkmarkStyle}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <polyline
                            points="1.5 5 4 7.5 8.5 2.5"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span style={{ textTransform: "capitalize" }}>{category}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Sort */}
      <div style={{ flex: "0 0 auto" }}>
        <p style={sectionTitleStyle}>Sort by Price</p>
        <select
          style={{
            ...selectStyle,
            borderColor: selectFocused ? "#6366f1" : "#e0e0e0",
            boxShadow: selectFocused ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
          }}
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          onFocus={() => setSelectFocused(true)}
          onBlur={() => setSelectFocused(false)}
        >
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </motion.div>
  );
};

export default FilterBar;