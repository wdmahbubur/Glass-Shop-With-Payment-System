import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckOut = () => {
    const basket = useSelector((state) => state.basket);
    const navigate = useNavigate();

    const url = "/shop";
    useEffect(() => {
        if (basket.length < 1) {
            navigate(url, { replace: true })
        }
    })
    return (
        <Container sx={{ my: 4 }} >
            <Outlet />
        </Container >
    );
};

export default CheckOut;