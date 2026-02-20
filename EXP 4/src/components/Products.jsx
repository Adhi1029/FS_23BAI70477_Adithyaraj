import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { useEffect } from "react";

export default function Products() {

  const dispatch = useDispatch();

  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === "loading")
    return <h2>Loading products...</h2>;

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  };

  const imgStyle = {
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px"
  };

  const buttonStyle = {
    background: "#00c9ff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div>

      <h2>🛍 Products</h2>

      <div style={containerStyle}>

        {products.map(product => (

          <div key={product.id} style={cardStyle}>

            <img
              src={product.image}
              alt={product.title}
              style={imgStyle}
            />

            <h4>{product.title}</h4>

            <p>₹ {Math.round(product.price * 80)}</p>

            <button
              style={buttonStyle}
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}