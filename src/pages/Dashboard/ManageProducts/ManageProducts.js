import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../../hooks/useAuth';
import usePageTitle from '../../../hooks/usePageTitle';
import { useSelector, useDispatch } from 'react-redux'
import { displayDate } from '../../../helpers/utils';
import { deleteProduct, getProducts } from '../../../redux/slices/productSlice';

const ManageProducts = () => {
    const { user } = useAuth()
    usePageTitle("Manage Glass | GlassShop");
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    console.log(products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div>
            <Typography variant="h4" component="h6" sx={{ textAlign: 'center', mb: 2 }}>
                {user.role === "ADMIN" ? "Order List" : "My Order"}
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Add Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.maxQuantity}</TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{displayDate(product.createdAt)}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color='error' onClick={() => dispatch(deleteProduct(product._id))}>Delete Glass <DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageProducts;