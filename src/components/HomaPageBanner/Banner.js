import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import bannerGirl from '../../images/banner-girl.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Banner = () => {
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: '#f3f3f3' }}>
                <Box sx={{ width: '50%', py: { xs: 2, md: 5 }, pl: { xs: 1, md: 5 } }}>
                    <Typography variant="h3" sx={{ fontWeight: 'light', fontSize: { xs: '20px', md: '60px' } }}><strong>See</strong> everything
                        <br />
                        with <strong>Clarity</strong>
                    </Typography >
                    <Typography variant="p" component="h3" sx={{ fontWeight: 'normal', fontSize: { xs: 10, md: 18 }, color: 'bfbfbf', mt: { xs: 1, md: 2 } }}>
                        Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.
                    </Typography>
                    <Button variant="contained" sx={{ mt: { xs: 2, md: 5 }, bgcolor: 'primary.main', color: 'white', alignItems: 'center', }}>Shop Now <ArrowForwardIcon /></Button>
                </Box>
                <Box sx={{ width: '50%' }}>
                    <img src={bannerGirl} alt="" className='banner-girl' />
                </Box>
            </Box>
        </div >
    );
};

export default Banner;