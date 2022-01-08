import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchAddToBasket } from '../../redux/slices/basketSlice';


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, name, price, image } = product
  const navigate = useNavigate();
  const AddToCartBtn = useRef();
  const productCardImage = useRef();
  const cardContent = useRef();

  const basket = useSelector((state) => state.basket);

  const isItemOnBasket = (id) => !!basket.find((product) => product._id === id);
  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product._id) : false;

  const showAddToCartButton = () => {
    AddToCartBtn.current.style.bottom = 0;
    productCardImage.current.style.transform = "scale(.8,.8)"
    cardContent.current.style.transform = "translateY(-20px)";
  }

  const hideAddToCartButton = () => {
    productCardImage.current.style.transform = "scale(1,1)"
    AddToCartBtn.current.style.position = "absolute";
    AddToCartBtn.current.style.bottom = "-50%";
    cardContent.current.style.transform = "translateY(0px)";
  }

  const productDetails = (id) => {
    navigate(`/shop/${id}`, { replace: true })
  }

  const handleAddToCart = () => {
    dispatch(dispatchAddToBasket({ ...product, quantity: 1, selectedSize: product.sizes[0] }));
  }

  return (
    <Card sx={{ maxWidth: 345, position: 'relative', cursor: 'pointer' }} onMouseOver={showAddToCartButton} onMouseOut={hideAddToCartButton}>
      <Box onClick={() => productDetails(_id)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt=""
            ref={productCardImage}
            sx={{ transition: "all .8s ease-in-out" }}
          />
        </CardActionArea>
        <CardContent ref={cardContent} sx={{ transition: "all .8s ease-in-out" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            ${price}
          </Typography>
        </CardContent>
      </Box>

      <Button
        variant='contained'
        className="AddToCartBtn"
        sx={{
          width: '100%',
          borderRadius: '0 0',
          position: 'absolute',
          bottom: '-50%',
          transition: "all .4s ease-in-out"
        }}
        ref={AddToCartBtn}
        onClick={handleAddToCart}
        disabled={itemOnBasket ? true : false}
      >
        {
          itemOnBasket ? "Already added in Cart" : <>{"Add To Cart"}< AddShoppingCartIcon /></>
        }

      </Button>
    </Card>
  );
}
export default ProductCard;