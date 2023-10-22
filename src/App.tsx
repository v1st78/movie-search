import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme";
import { useThemeMode } from "./context/ThemeModeContext";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import SavedPage from "./pages/SavedPage";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import UpComing from "./pages/UpComing";

function App() {

  const themeMode = useThemeMode();

  return (
    <>
      <ThemeProvider theme={themeMode.isDarkMode ? darkTheme : lightTheme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/details/:title/:id" element={<MovieDetails />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<UpComing />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
