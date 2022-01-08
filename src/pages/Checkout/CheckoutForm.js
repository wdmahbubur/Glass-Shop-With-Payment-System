import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Box, Button, Typography } from '@mui/material';
import { displayMoney, calculateTotal } from "../../helpers/utils"

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import axios from 'axios';
import { setSuccess, setError, setLoading } from '../../redux/slices/appSlice';
import useAuth from "../../hooks/useAuth";
import { clearBasket } from '../../redux/slices/basketSlice';

const CheckoutForm = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);
    const shippingDetails = useSelector((state) => state.checkout.shipping);

    const { loading } = useSelector((state) => state.app);

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const totalAmount = calculateTotal(basket.map((product) => product.price * product.quantity)) || 1;

    const [clientSecret, setClientSecret] = useState();
    useEffect(() => {
        axios.post("https://stormy-journey-43640.herokuapp.com/api/create-payment-intent", {
            amount: totalAmount
        }).then(res => setClientSecret(res.data.clientSecret))
    }, [totalAmount])

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(setLoading(true))

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            dispatch(setError(error))
        }
        else {
            dispatch(setError(false))
        }
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: shippingDetails.name,
                        email: shippingDetails.email
                    },
                },
            },
        );

        if (intentError) {
            dispatch(setError(intentError.message))
            dispatch(setLoading(false));
        }
        else {
            const orderInfo = {
                shippingAddress: shippingDetails,
                products: basket,
                user: {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid
                }
            }
            axios.post("https://stormy-journey-43640.herokuapp.com/api/orders", {
                orderInfo: orderInfo
            }).then(res => {
                if (res.data.product) {
                    dispatch(setError(false));
                    dispatch(setSuccess(true));
                    dispatch(setLoading(false));
                    navigate("/dashboard", { replace: true });
                    dispatch(clearBasket());
                }
            }).catch(e => {
                dispatch(setError(e.message));
                dispatch(setSuccess(false));
                dispatch(setLoading(false));
            })

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ width: { xs: "100%", md: "60%" }, mx: "auto", border: `1px solid ${grey[400]}`, p: 3 }}>
                <CardElement />
                <Box sx={{ display: "flex", mt: 2, justifyContent: "space-between", alignItems: "center", py: 3, bgcolor: "white" }}>
                    <Box>
                        <Button as={Link} variant="contained" size="large" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }} to="/checkout/shipping-details" >
                            <ArrowBack /> Go Back
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="body2">
                            Subtotal Amount
                        </Typography>

                        <Typography variant="h5">
                            {displayMoney(totalAmount)}
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 2
                            }}
                            disabled={loading ? true : false}
                        >
                            Confirm <ShoppingCartCheckoutIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>

        </form>
    )
};

export default CheckoutForm;