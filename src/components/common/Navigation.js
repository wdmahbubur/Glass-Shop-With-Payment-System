import React, { Fragment, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { openBasket } from '../../redux/slices/appSlice';

const Navigation = () => {
    const { user, logout } = useAuth();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const basketLength = useSelector((state) => state.basket.length);
    const dispatch = useDispatch()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Mobile Menu Logo*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        GlassShop
                    </Typography>

                    {/* Mobile popup menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink to="/"
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? "gray" : "Black",
                                                textDecoration: 'none'
                                            };
                                        }}>Home
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink to="/shop"
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? "#dedede" : "Black",
                                                textDecoration: 'none'
                                            };
                                        }}>
                                        Shop
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            {!user?.email && <>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to="/sign-in"
                                            style={({ isActive }) => {
                                                return {
                                                    color: isActive ? "#dedede" : "Black",
                                                    textDecoration: 'none'
                                                };
                                            }}>
                                            Sign In
                                        </NavLink>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to="/sign-up"
                                            style={({ isActive }) => {
                                                return {
                                                    color: isActive ? "#dedede" : "Black",
                                                    textDecoration: 'none'
                                                };
                                            }}>
                                            Sign Up
                                        </NavLink>
                                    </Typography>
                                </MenuItem>
                            </>
                            }
                        </Menu>
                    </Box>

                    {/* desktop menu */}
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        GlassShop
                    </Typography>

                    {/* Menu link */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to="/"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#c7c7c7" : "",
                                    textDecoration: isActive ? 'underline' : "none"
                                };
                            }}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block', color: "white" }}
                            >
                                Home
                            </Button>
                        </NavLink>

                        <NavLink to="/shop"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#c7c7c7" : "",
                                    textDecoration: isActive ? 'underline' : "none"
                                };
                            }}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block', color: "white" }}
                            >
                                Shop
                            </Button>
                        </NavLink>

                    </Box>

                    {/* right side menu */}
                    <Box sx={{ display: 'flex' }}>
                        <Button
                            onClick={() => dispatch(openBasket(true))}
                            sx={{ display: 'block', color: "white", mr: 5, position: "relative" }}
                        >
                            <Badge badgeContent={basketLength} color="secondary">
                                <ShoppingCartIcon color="" />
                            </Badge>
                        </Button>

                        {user?.email ?
                            <>
                                {/* user pop up menu */}
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user?.displayName} src={user?.photoURL} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <NavLink to="/dashboard"
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? "#c7c7c7" : "",
                                                textDecoration: isActive ? 'underline' : "none"
                                            };
                                        }}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, display: 'block', }}
                                        >
                                            Dashboard
                                        </Button>
                                    </NavLink>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Button onClick={logout}>Logout</Button>
                                    </MenuItem>

                                </Menu>
                            </>
                            :
                            <>
                                <NavLink to="/sign-in"
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "#c7c7c7" : "",
                                            textDecoration: isActive ? 'underline' : "none"
                                        };
                                    }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: 'block', borderColor: 'white', mx: 1, color: "white" }}
                                        variant="outlined"
                                    >
                                        Sign In
                                    </Button>
                                </NavLink>

                                <NavLink to="/sign-up"
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "#c7c7c7" : "",
                                            textDecoration: isActive ? 'underline' : "none"
                                        };
                                    }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: 'block', borderColor: 'white', mx: 1, color: "white" }}
                                        variant="outlined"
                                    >
                                        Sign Up
                                    </Button>
                                </NavLink>
                            </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navigation;
