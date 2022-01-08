import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import { Avatar, Button, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const drawerWidth = 240;

function Dashboard(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <Link as={NavLink} to="/" sx={{ color: '#757575', textDecoration: 'none' }}>
                        GlassShop
                    </Link>
                </Typography>
            </Toolbar>
            <Divider />
            <List>

                <ListItem button as={NavLink} to="" style={({ isActive }) => {
                    return {
                        color: isActive ? "primary.main" : "black",
                    };
                }} >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                {user.role === "ADMIN" && <>
                    <ListItem button as={NavLink} to="add-product" style={({ isActive }) => {
                        return {
                            color: isActive ? "primary.main" : "black",
                        };
                    }} >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Glass" />
                    </ListItem>

                    <ListItem button as={NavLink} to="manage-products" style={({ isActive }) => {
                        return {
                            color: isActive ? "primary.main" : "black",
                        };
                    }} >
                        <ListItemIcon>
                            <VisibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Glasses" />
                    </ListItem>
                </>
                }
                <ListItem button as={NavLink} to="/" style={({ isActive }) => {
                    return {
                        color: isActive ? "primary.main" : "black",
                    };
                }} >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Back To Home" />
                </ListItem>

            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                    </Box>

                    {/* user popup menu */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', flexGrow: 1 }}>
                        {user?.email ?
                            <>
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
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Dashboard;
