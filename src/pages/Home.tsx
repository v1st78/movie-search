import { Box, IconButton, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useThemeMode } from "../context/ThemeModeContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const themeMode = useThemeMode();
  const navigate = useNavigate();
  const [inputSearchData, setInputSearchData] = useState("");

  const handleSearch = () => {
    const query = inputSearchData.replace(' ', '+');
    if(query){
      setInputSearchData("");
      navigate(`/search/${query}`);
    }
  }

  return (
    <Box>
      <Typography variant="h2" component="h1" textAlign="center" mb="30px">Search</Typography>

      <Box position="relative" maxWidth="100%">
        <input
          onChange={(e) => setInputSearchData(e.target.value)}
          value={inputSearchData} onKeyDown={(e) => { if (e.key == "Enter") handleSearch() }}
          style={{
            borderRadius: "15px",
            border: themeMode.isDarkMode ? '1px solid white' : '1px solid black',
            width: "100%",
            boxSizing: "border-box",
            padding: '12px 50px 12px 10px',
            fontFamily: 'Roboto',
            fontSize: "17px",
            outline: 'none',
            backgroundColor: 'white',
            color: '#121212'
          }}
          placeholder="Search" />

        <IconButton
          onClick={handleSearch}
          sx={{
            position: 'absolute',
            top: '-8px',
            right: '-5px'
          }}
          disableRipple
        >
          <SearchIcon
            sx={{
              fontSize: '50px',
              color: "#121212",
            }} />
        </IconButton>
      </Box>
    </Box>
  )
}
export default Home