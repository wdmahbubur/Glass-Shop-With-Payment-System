import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import BasketItem from '../../components/common/Basket/BasketItem';
import { displayMoney, calculateTotal } from "../../helpers/utils"

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowForward, Shop } from '@mui/icons-material';
import usePageTitle from '../../hooks/usePageTitle';

const OrderSummery = () => {
    const basket = useSelector((state) => state.basket);
    usePageTitle("Order Summery | GlassShop")
    return (
        <Box sx={{ position: 'relative', width: { xs: "100%", md: "70%" }, mx: "auto" }}>
            <Box sx={{ textAlign: "center", my: 2, color: grey[700] }}>
                <Typography variant="h6" component="h6">
                    Order Summery
                </Typography>
                <Typography variant="subtitle2" component="p">
                    Review items in your basket.
                </Typography>
            </Box>
            <BasketItem />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${grey[500]}`, py: 3, bgcolor: "white" }}>
                <Box>
                    <Button as={Link} variant="contained" size="large" sx={{ display: "flex", alignItems: "center", textDecoration: "none", py: 2 }} to="/shop" >
                        <Shop /> Continue Shopping
                    </Button>
                </Box>
                <Box>
                    <Typography variant="body2">
                        Subtotal Amount
                    </Typography>
                    <Typography variant="h5">
                        {displayMoney(calculateTotal(basket.map((product) => product.price * product.quantity)))}
                    </Typography>
                    <Button as={Link} variant="contained" size="large" sx={{ display: "flex", alignItems: "center", textDecoration: "none", mt: 2 }} to="shipping-details" >
                        Next Step <ArrowForward />
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default OrderSummery;