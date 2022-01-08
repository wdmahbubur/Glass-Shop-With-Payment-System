import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <Box sx={{ bgcolor: '#f3f3f3', py: 3, textAlign: 'center' }}>
                <Typography variant="p">
                    &copy; 2022. All Rights Reserved By GlassShop. Developed By <a href="https://mahbubur-rahman.vercel.app/" target="blank">Mahbubur Rahman</a>
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;