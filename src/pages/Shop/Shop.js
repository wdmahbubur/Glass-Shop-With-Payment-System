import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../../components/common/Card';
import { getProducts } from '../../redux/slices/productSlice';
const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <Container sx={{ my: { xs: 4, md: 8 } }}>
            <Grid container spacing={2}>
                {products.map(product => <Grid item md={3} xs={1} key={product._id}>
                    <ProductCard product={product} />
                </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Shop;