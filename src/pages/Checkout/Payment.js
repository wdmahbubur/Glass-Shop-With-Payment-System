import React from 'react';
import { Box, Typography } from '@mui/material';

import { grey } from '@mui/material/colors';
import usePageTitle from '../../hooks/usePageTitle';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KExSPBGYALpodpfsATg3hjeWrSMDgbL86ZQhN3BmyPLYu50n0NR62mE4r3twzPUF66chdhA0ss7l3EQYeAGLaUo00X6ai7sbV');

const Payment = () => {
    usePageTitle("Payment | GlassShop")

    return (
        <Box sx={{ position: 'relative', width: { xs: "100%", md: "70%" }, mx: "auto" }}>
            <Box sx={{ textAlign: "center", my: 2, color: grey[700] }}>
                <Typography variant="h6" component="h6">
                    Payment
                </Typography>
            </Box>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </Box >
    );
};

export default Payment;