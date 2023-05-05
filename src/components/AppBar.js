import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Route, Routes, Link} from "react-router-dom";
import Login from "./Login";
import Banks from "./Banks";
import {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import {Grid} from "@mui/material";
import UserBanks from "./UserBanks";
import Transactions from "./Transactions";
import AddBank from "./AddBank";

const ButtonAppBar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = AuthService.getCurrentUser()

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ADMIN"))
        }
    }, [])

    const logOut = () => {
        AuthService.logout()
    };
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Banks
                    </Typography>
                    {showAdminBoard &&
                        <Button color="inherit">
                            <Link to={"/addBanks"}>
                                Add banks
                            </Link>
                        </Button>
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
                        <Button color="inherit">
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {<Route path="/banks" element={<Banks />} />}
                    {<Route path="/addBanks" element={<AddBank />} />}
                    {<Route path="/userbanks" element={<UserBanks />} />}
                    {<Route path="/transactions" element={<Transactions />} />}
                </Routes>
            </div>
        </Box>
    );
}

export default ButtonAppBar