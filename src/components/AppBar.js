import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Banks from "./Banks";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { Avatar, Grid, MenuItem, Menu, Container } from "@mui/material";
import UserBanks from "./UserBanks";
import Transactions from "./Transactions";
import AddBank from "./AddBank";
import logo from "../logo.svg"
import "../assets/css/style.css"
import ThemeToggleButton from "./ThemeToogleButton";
import { useCustomTheme } from "../context/ThemeContext";

const ButtonAppBar = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isDarkTheme } = useCustomTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    AuthService.logout()
  };

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser())
    setShowAdminBoard(AuthService.isAdmin())
  }, [])

  return (
    <Box className={isDarkTheme ? 'dark-theme' : 'light-theme'} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar variant="rounded" alt="Banks" src={logo}/>
          </IconButton>
          <ThemeToggleButton sx={{ mr: 2 }}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bank transfers
          </Typography>
          {showAdminBoard &&
            <div>
              <Button
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Admin
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              >
                <MenuItem className="sub-list" color="inherit" onClick={handleClose}>
                  <Link to={"/addBanks"}>
                    Add banks
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          }
          {currentUser ?
            <Grid>
              <Button color="inherit">
                <Link to={"/banks"}>
                  Banks
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={"/userbanks"}>
                  UserBanks
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={"/transactions"}>
                  Transactions
                </Link>
              </Button>
              <Button color="inherit">
                <a href="/login" onClick={logOut}>
                  LogOut
                </a>
              </Button>
            </Grid> :
            <Grid>
              <Button color="inherit">
                <Link to={"/login"}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={"/register"}>
                  Sign up
                </Link>
              </Button>
            </Grid>
          }
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/banks" element={<Banks/>}/>
          <Route path="/addBanks" element={<AddBank/>}/>
          <Route path="/userbanks" element={<UserBanks/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
        </Routes>
      </Container>
    </Box>
  );
}

export default ButtonAppBar