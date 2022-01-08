
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ProductCard from '../../components/common/Card';
import { grey } from '@mui/material/colors';
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from 'react-redux';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { getFeaturedProduct } from "../../redux/slices/productSlice";

// Import Swiper styles
import "swiper/css";
SwiperCore.use([Pagination, Autoplay]);
const SectionHeaderColor = grey[700]

const FeaturedProductSlide = () => {
    const dispatch = useDispatch();
    const featuredProducts = useSelector((state) => state.products.featuredProducts);

    useEffect(() => {
        dispatch(getFeaturedProduct(6))
    }, [dispatch])
    return (
        <Box sx={{ my: 10 }}>
            <Typography variant='h4' sx={{ my: 4, fontWeight: 'medium', color: SectionHeaderColor }}>
                Featured Glass
            </Typography>
            <Box>
                <Swiper spaceBetween={10} autoplay={{
                    "delay": 5000
                }} breakpoints={{
                    "640": {
                        "slidesPerView": 4,
                        "spaceBetween": 20
                    },
                    "768": {
                        "slidesPerView": 4,
                        "spaceBetween": 40
                    },
                    "1024": {
                        "slidesPerView": 4,
                        "spaceBetween": 30
                    }
                }} className="mySwiper">
                    {featuredProducts.map(product => <SwiperSlide key={product._id} style={{ width: '30%' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                    )}

                </Swiper>
            </Box>
        </Box>
    );
};

export default FeaturedProductSlide;