import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { displayMoney, calculateTotal } from "../../helpers/utils"

import { useSelector, useDispatch } from 'react-redux';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { setCheckOutShippingDetails } from '../../redux/slices/checkoutSlice';
import usePageTitle from '../../hooks/usePageTitle';
import { Link, useNavigate } from 'react-router-dom';

const ShippingDetails = () => {
    const basket = useSelector((state) => state.basket);
    usePageTitle("Shipping Details | GlassShop")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        dispatch(setCheckOutShippingDetails(data))
        navigate("/checkout/payment", { replace: true })
    }
    return (
        <Box sx={{ position: 'relative', width: { xs: "100%", md: "70%" }, mx: "auto" }}>
            <Box sx={{ textAlign: "center", my: 2, color: grey[700] }}>
                <Typography variant="h6" component="h6">
                    Shipping Details
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <TextField label="Name" variant="standard" name="name" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Email" type="email" variant="standard" name="email" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            label="Shipping Address"
                            multiline
                            rows={2}
                            variant="standard"
                            name="address"
                            fullWidth
                            onChange={handleInput}
                            required
                        />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Mobile Number" variant="standard" name="mobileNumber" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 3, bgcolor: "white" }}>
                    <Box>
                        <Button as={Link} variant="contained" size="large" sx={{ display: "flex", alignItems: "center", textDecoration: "none", py: 2 }} to="/checkout" >
                            <ArrowBack /> Go Back
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="body2">
                            Subtotal Amount
                        </Typography>
                        <Typography variant="h5">
                            {displayMoney(calculateTotal(basket.map((product) => product.price * product.quantity)))}
                        </Typography>
                        <Button type="submit" variant="contained" size="large" sx={{ display: "flex", alignItems: "center", mt: 2 }} >
                            Next Step <ArrowForward />
                        </Button>
                    </Box>
                </Box>
            </form>

        </Box >
    );
};

export default ShippingDetails;