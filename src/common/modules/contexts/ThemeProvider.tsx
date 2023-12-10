import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Create a context for the theme
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: (newTheme: string) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // State to manage the theme
  const [theme, setTheme] = useState("light"); // Default theme

  // Function to toggle the theme
  const toggleTheme = (newTheme: string) => {
    if (newTheme) setTheme(newTheme);
    Cookies.set("theme", newTheme, { expires: 7 }); // Save theme preference for 7 days
  };
  // Effect to load the theme from cookies on initial render
  useEffect(() => {
    const savedTheme = Cookies.get("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Return the provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
