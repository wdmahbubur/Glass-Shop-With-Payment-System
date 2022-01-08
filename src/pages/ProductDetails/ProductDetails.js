import { Box, Button, Container, Grid, Link, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RecommendProductSlide from '../../components/RecommendProductSlide/RecommendProductSlide';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from "../../redux/slices/productSlice";

import { NavLink, useParams } from 'react-router-dom';
import { dispatchAddToBasket } from '../../redux/slices/basketSlice';
import { ArrowBack } from '@mui/icons-material';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id])

    const product = useSelector((state) => state.products.product);

    const [size, setSize] = useState();
    const basket = useSelector((state) => state.basket);

    const isItemOnBasket = (id) => !!basket.find((product) => product._id === id);
    const itemOnBasket = isItemOnBasket ? isItemOnBasket(product._id) : false;

    const handleAddToCart = () => {
        dispatch(dispatchAddToBasket({ ...product, quantity: 1, selectedSize: size || product.sizes[0] }));
    }

    return (
        <Container sx={{ my: { xs: 4, md: 4 } }}>
            <Box sx={{ py: 2 }}>
                <NavLink to="/shop" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black", fontSize: "20px", fontWeight: "bold" }}>
                    <ArrowBack />Back To Shop
                </NavLink>
            </Box>
            <Box sx={{ border: '1px solid #dedede', p: { xs: 2, md: 5 } }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={4}>
                    <Grid item md={6}>
                        <img src={product.image} alt="" className="productImage" />
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
                            {product.brand}
                        </Typography>
                        <Typography variant="h4" component="h1" >
                            {product.name}
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ mt: 4, color: grey[800] }}>
                            {product.description}
                        </Typography>
                        <div style={{ background: grey[300], width: '100%', height: '2px', margin: '15px 0' }} />
                        <Typography variant="subtitle2" sx={{ color: grey[500], my: 1 }}>
                            Lens and Frame Size
                        </Typography>
                        <TextField
                            defaultValue={size}
                            select
                            label="Size"
                            helperText="Please select your lens and frame size"
                            onChange={(e) => setSize(e.target.value)}

                        >
                            {product.sizes?.map((size) => <MenuItem key={size} value={size}>
                                {size} mm
                            </MenuItem>
                            )}
                        </TextField>
                        <Typography variant="h5" component="p" sx={{ fontWeight: 'medium', my: 2 }} >
                            ${product.price}
                        </Typography>
                        <Button
                            variant='contained'
                            size="large"
                            onClick={handleAddToCart}
                            disabled={itemOnBasket ? true : false}
                        >
                            {
                                itemOnBasket ? "Already added in Cart" : <>{"Add To Cart"}< AddShoppingCartIcon /></>
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Recommended Products Slide */}
            <RecommendProductSlide />
        </Container>
    );
};

export default ProductDetails;