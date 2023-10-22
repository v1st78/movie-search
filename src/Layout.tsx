import { Box, Container, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from "./context/ThemeModeContext";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useTheme } from "@emotion/react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Layout = () => {
  return (
    <Box minHeight="100vh" sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      <Header />

      <Container component="main">
        <Box pt="10px" pb="20px">
          <Outlet />
        </Box>
      </Container>

    </Box>
  )
}

export default Layout

const Header = () => {
  const theme: any = useTheme();
  const themeMode = useThemeMode();
  const navigate = useNavigate();
  const [inputSearchData, setInputSearchData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const menu: { text: string, path: string, icon: JSX.Element }[] = [
    {
      text: "Top Rated",
      path: '/top-rated',
      icon: <StarIcon />
    },
    {
      text: "Popular",
      path: '/popular',
      icon: <WhatshotIcon />
    },
    {
      text: "Upcoming",
      path: '/upcoming',
      icon: <UpcomingIcon />
    }
  ]

  const handleSearch = () => {
    const query = inputSearchData.replace(' ', '+');
    if (query) {
      setInputSearchData("");
      navigate(`/search/${query}`);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  if (isMdScreen) {
    return (
      <Box component="header" display="flex" justifyContent="space-between" alignItems="center" px="30px" pt="20px" mb="20px">
        {/* Logo */}
        <Box>
          <Link to="/">
            <Typography variant="h6">MovieSearch</Typography>
          </Link>
        </Box>

        <IconButton onClick={toggleMenu} sx={{ color: themeMode.isDarkMode ? 'white' : 'black', position: 'relative', zIndex: '5' }}>
          {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </IconButton>

        {/* Menu */}
        {
          isMenuOpen &&

          <Box position="fixed" top="0" left="0" width="100%" height="100%" bgcolor="background.paper" pt="30px" zIndex="4">
            <Box position="relative" margin="0 auto 20px" width="50%">
              <input
                onChange={(e) => setInputSearchData(e.target.value)}
                value={inputSearchData} onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSearch()
                    toggleMenu();
                  }
                }}
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
                onClick={() => {
                  handleSearch();
                  toggleMenu();
                }}
                sx={{
                  position: 'absolute',
                  top: '-8px',
                  right: '0px'
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

            <List component="nav">

              {menu.map(item =>
                <ListItemButton key={item.text} onClick={() => {
                  navigate(item.path);
                  toggleMenu();
                }}>
                  <Box display="flex" alignItems="center" margin="0 auto" pl="40px" py="15px">
                    <ListItemText sx={{ mr: '10px' }}><Typography fontSize="18px">{item.text}</Typography></ListItemText>
                    <ListItemIcon sx={{ color: themeMode.isDarkMode ? 'primary.main' : 'secondary.main' }}>{item.icon}</ListItemIcon>
                  </Box>
                </ListItemButton>
              )}

              <ListItemButton onClick={() => {
                navigate('/saved');
                toggleMenu();
              }}>
                <Box display="flex" alignItems="center" margin="0 auto" pl="40px" py="15px">
                  <ListItemText sx={{ mr: '10px' }}><Typography fontSize="18px">Saved</Typography></ListItemText>
                  <ListItemIcon sx={{ color: 'primary.main' }}><BookmarkIcon /></ListItemIcon>
                </Box>
              </ListItemButton>

              <ListItemButton onClick={() => {
                themeMode.toggleThemeMode();
              }}>
                <Box display="flex" alignItems="center" margin="0 auto" pl="40px" py="15px">
                  <ListItemText sx={{ mr: '10px' }}><Typography fontSize="18px">Change Theme Mode</Typography></ListItemText>
                  <ListItemIcon>{themeMode.isDarkMode ? <DarkModeIcon sx={{ color: "primary.main" }} fontSize="large" /> : <LightModeIcon sx={{ color: "secondary.main" }} fontSize="large" />}</ListItemIcon>
                </Box>
              </ListItemButton>
            </List>



          </Box>
        }
      </Box >
    )
  } else {
    return (
      <Box component="header" display="flex" justifyContent="space-between" alignItems="center" px="30px" pt="20px" mb="20px">

        {/* Logo */}
        <Box>
          <Link to="/">
            <Typography variant="h6">MovieSearch</Typography>
          </Link>
        </Box>

        {/* Menu */}
        <List component="nav" sx={{ display: "flex" }}>
          {
            menu.map(item =>
              <ListItemButton key={item.text} sx={
                { '&:hover': { backgroundColor: 'transparent !important' },
                }} onClick={() => navigate(item.path)} disableRipple>

                <ListItemText sx={{ mr: '10px' }}>
                  <Typography fontSize="14px" noWrap>{item.text}</Typography>
                </ListItemText>

                <ListItemIcon sx={{ color: themeMode.isDarkMode ? 'primary.main' : 'secondary.main', minWidth: '0' }}>
                  {item.icon}
                </ListItemIcon>

              </ListItemButton>
            )
          }

        </List>

        <Box display="flex">
          {/* Search */}
          {
            (useLocation().pathname !== '/') && <Box position="relative" mr="30px">
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
                  right: '0px'
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
          }

          {/* Buttons */}
          <Box display="flex">
            <Link to="/saved">
              <IconButton color="primary"><BookmarkIcon fontSize="large" /></IconButton>
            </Link>

            <IconButton onClick={themeMode.toggleThemeMode} color={themeMode.isDarkMode ? "primary" : "secondary"}>
              {themeMode.isDarkMode ? <DarkModeIcon fontSize="large" /> : <LightModeIcon fontSize="large" />}
            </IconButton>

          </Box>
        </Box>

      </Box>
    )
  }
}

