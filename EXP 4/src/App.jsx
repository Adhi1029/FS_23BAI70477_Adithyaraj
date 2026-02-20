import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useTheme } from "./context/ThemeContext";

function App() {

  const { theme } = useTheme();

  const appStyle = {
    padding: "20px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    minHeight: "100vh",

    background:
      theme === "light"
        ? "linear-gradient(120deg, #f6f9fc, #e9eff5)"
        : "linear-gradient(120deg, #1e1e2f, #2c2c54)",

    color: theme === "light" ? "#000" : "#fff"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto"
  };

  return (
    <div style={appStyle}>

      <div style={containerStyle}>

        {/* Context API Components */}
        <Header />

        {/* Redux Toolkit Components */}
        <Products />

        <Cart />

      </div>

    </div>
  );
}

export default App;