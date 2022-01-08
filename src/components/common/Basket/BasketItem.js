import React from 'react';
import { displayMoney } from "../../../helpers/utils"
import { addQtyItem, minusQtyItem, removeFromBasket } from '../../../redux/slices/basketSlice';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const BasketItem = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);

    return (
        basket.map((product) => <Grid container sx={{ py: 2, alignItems: "center", pr: 2, rowGap: 3, border: `1px solid ${grey[300]}` }} key={product._id}>
            <Grid item md={1} xs={12} sx={{ order: { xs: 3, md: 1 } }}>
                <Button
                    variant="outlined"
                    sx={{
                        minWidth: .5,
                        px: 1,
                        borderColor: grey[600],
                        fontSize: "20px"
                    }}
                    onClick={() => dispatch(addQtyItem(product._id))}
                >
                    +
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        minWidth: { xs: .5, md: .7 },
                        px: 1,
                        borderColor: grey[600],
                        fontSize: "20px"
                    }}
                    onClick={() => dispatch(minusQtyItem(product._id))}
                    disabled={product.quantity === 1}
                >
                    -
                </Button>
            </Grid>
            <Grid item md={3} xs={6} sx={{ order: { xs: 1, md: 2 } }}>
                <img src={product.image} alt="" style={{ height: "100%", width: "100px" }} />
            </Grid>
            <Grid item md={4} xs={6} sx={{ order: { xs: 2, md: 3 } }}>
                <Typography variant="h6" component="h6">
                    {product.name}
                </Typography>

                <Grid container sx={{ gap: { xs: 2, md: 0 } }}>
                    <Grid item md={6}>
                        <Typography variant="subtitle2" component="h6">
                            Quantity
                        </Typography>
                        {product.quantity}
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="subtitle2" component="h6">
                            Size
                        </Typography>
                        {product.selectedSize} mm
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={3} xs={6} sx={{ order: 4 }}>
                <Typography variant="h5" component="h6">
                    {displayMoney(product.totalPrice || product.price)}
                </Typography>
            </Grid>
            <Grid item md={1} xs={6} sx={{ order: 5 }}>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: .5,
                        px: 1,
                        borderColor: grey[600]
                    }}
                    onClick={() => dispatch(removeFromBasket(product._id))}
                >
                    <ClearIcon />
                </Button>
            </Grid>
        </Grid>
        )
    );
};

export default BasketItem;