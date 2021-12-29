import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();

  const keepTheme = () => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "theme-dark") {
        setDefaultTheme("theme-dark");
      } else if (localStorage.getItem("theme") === "theme-light") {
        setDefaultTheme("theme-light");
      }
    } else {
      setDefaultTheme("theme-dark");
    }
  };

  const setDefaultTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  };

  const [togClass, setTogClass] = useState("light");

  const values = {
    theme,
    setTheme,
    keepTheme,
    setDefaultTheme,
    togClass,
    setTogClass,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
