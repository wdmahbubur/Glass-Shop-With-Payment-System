import { Box, Button, Container, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openBasket } from '../../../redux/slices/appSlice';
import { displayMoney, calculateTotal } from "../../../helpers/utils"
import BasketItem from './BasketItem';
import { Link } from 'react-router-dom';

const Basket = () => {
    const dispatch = useDispatch();
    const onBasket = useSelector((state) => state.app.openBasket);
    const basket = useSelector((state) => state.basket);

    return (
        <Container sx={{ width: { xs: "100%", md: "40%" }, height: "100%", position: "fixed", top: { xs: "", md: "0" }, right: onBasket ? "0" : "-100%", bgcolor: "white", zIndex: 20024, p: { xs: 2, md: 3 }, transition: "all .5s ease-in-out", boxShadow: 2 }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" component="h6">
                    My Order ({basket.length} items)
                </Typography>
                <Button variant="contained" sx={{ display: "block" }} onClick={() => dispatch(openBasket(false))}>
                    Close
                </Button>
            </Box>
            <Box sx={{ overflowY: "scroll", height: "100%" }}>
                <BasketItem />

            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", position: "fixed", bottom: 0, width: { xs: "90%", md: "37%" }, borderTop: `1px solid ${grey[500]}`, py: 3, bgcolor: "white" }}>
                <Box>
                    <Typography variant="body2">
                        Subtotal Amount
                    </Typography>
                    <Typography variant="h5">
                        {displayMoney(calculateTotal(basket.map((product) => product.price * product.quantity)))}
                    </Typography>
                </Box>
                <Box>
                    {
                        basket.length > 0 && <Button as={Link} variant="contained" size="large" sx={{ display: "block", textDecoration: "none" }} to="/checkout" onClick={() => dispatch(openBasket(false))}>
                            Check out
                        </Button>
                    }

                </Box>



            </Box>
        </Container>
    );
};

export default Basket;