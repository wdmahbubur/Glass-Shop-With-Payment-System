import { Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Basket from '../Basket/Basket';
import Footer from '../Footer';
import Navigation from '../Navigation';

const UserLayout = () => {
    return (
        <div>
            <Navigation />
            <Toolbar />
            <Basket />
            <Outlet />
            <Footer />
        </div>
    );
};

export default UserLayout;