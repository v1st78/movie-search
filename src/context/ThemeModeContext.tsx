import { ReactNode, createContext, useContext, useState } from "react"

type IThemeContext = {
  isDarkMode: boolean,
  toggleThemeMode: () => void
}

const ThemeModeContext = createContext<IThemeContext>({ isDarkMode: true, toggleThemeMode: () => { } });

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const savedIsDarkMode = JSON.parse(localStorage.getItem('isDarkMode') || "true");
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode ? true : false);

  const toggleThemeMode = () => {
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  }
  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
}