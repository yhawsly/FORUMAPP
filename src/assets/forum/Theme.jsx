import "./ThemeToggle.css";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="toggle">
        <label>
          <input type="checkbox" onChange={toggleTheme} />
          Toggle Dark Mode
        </label>
      </div>
      <div>
        <h1>Light/Dark Theme Toggle</h1>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default ThemeToggle;
