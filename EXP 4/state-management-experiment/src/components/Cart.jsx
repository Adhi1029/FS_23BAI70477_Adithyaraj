import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

export default function Cart() {

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const cartStyle = {
    marginTop: "30px",
    padding: "20px",
    background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    borderRadius: "10px"
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    background: "white",
    padding: "10px",
    borderRadius: "5px"
  };

  const imgStyle = {
    height: "50px"
  };

  const buttonStyle = {
    background: "#ff4b5c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div style={cartStyle}>

      <h2>🛒 Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(item => (

          <div key={item.id} style={itemStyle}>

            <img src={item.image} style={imgStyle} />

            <span>{item.title}</span>

            <button
              style={buttonStyle}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>

          </div>

        ))
      )}

    </div>
  );
}