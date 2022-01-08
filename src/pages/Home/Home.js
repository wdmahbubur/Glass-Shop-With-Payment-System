import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import FeaturedProductSlide from '../../components/FeaturedProductSlide/FeaturedProductSlide';
import Banner from '../../components/HomaPageBanner/Banner';
import RecommendProductSlide from '../../components/RecommendProductSlide/RecommendProductSlide';
import usePageTitle from '../../hooks/usePageTitle';


const Home = () => {
    usePageTitle("Home | GlassShop");
    return (
        <Container sx={{ mt: { xs: 4, md: 8 } }}>
            {/* Banner */}
            <Banner />

            {/* Featured Products Slide */}
            <FeaturedProductSlide />

            {/* Recommended Products Slide */}
            <RecommendProductSlide />

        </Container>
    );
};

export default Home;