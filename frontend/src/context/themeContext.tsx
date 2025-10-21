"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const themeTokens = {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#8E4EC6",
      borderRadius: 4,
      colorBgContainer: isDark ? "#121214" : "#f5f5f5",
    },
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ConfigProvider theme={themeTokens}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
