import { useState, useEffect } from "preact/hooks";

export type Color = "dark" | "light";

const useDarkMode = () => {
  const userTheme: Color = (localStorage.getItem("theme") as Color) || "dark";
  const [theme, setTheme] = useState<Color>(userTheme);
  const colorTheme: Color = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [colorTheme, setTheme] as const;
};

export default useDarkMode;
