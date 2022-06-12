import { useState, useEffect } from "preact/hooks";

const useDarkMode = () => {
  const userTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(userTheme);
  const colorTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
