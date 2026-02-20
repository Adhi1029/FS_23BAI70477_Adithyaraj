import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {

  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const headerStyle = {
    padding: "15px",
    background: theme === "light"
      ? "linear-gradient(90deg, #4facfe, #00f2fe)"
      : "linear-gradient(90deg, #434343, #000000)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "10px",
    marginBottom: "20px"
  };

  const buttonStyle = {
    margin: "5px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    background: "#ff7eb3",
    color: "white",
    cursor: "pointer"
  };

  return (
    <div style={headerStyle}>

      <h2>🛒 State Management Store</h2>

      <div>

        {user ? (
          <>
            <span>Welcome {user}</span>
            <button style={buttonStyle} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button style={buttonStyle} onClick={login}>
            Login
          </button>
        )}

        <button style={buttonStyle} onClick={toggleTheme}>
          Toggle Theme
        </button>

        <select
          style={buttonStyle}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Malayalam</option>
        </select>

      </div>

    </div>
  );
}