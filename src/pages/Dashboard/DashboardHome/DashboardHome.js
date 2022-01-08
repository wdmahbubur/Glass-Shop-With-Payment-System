import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import useAuth from '../../../hooks/useAuth';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import usePageTitle from '../../../hooks/usePageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, getMyOrders, deleteOrder } from '../../../redux/slices/orderSlice';
import { calculateTotal, displayDate, displayMoney } from '../../../helpers/utils';
import axios from 'axios';

const DashboardHome = () => {
    const { user } = useAuth();
    usePageTitle("Dashboard | GlassShop");
    const dispatch = useDispatch();
    const [status, setStatus] = useState();

    useEffect(() => {
        if (user.role === "ADMIN") {
            dispatch(getOrders())
        } else {
            dispatch(getMyOrders(user.uid))
        }

    }, [dispatch, user.role, user.uid, status])


    const orders = useSelector((state) => state.orders.orders)

    const handleOrderStatus = (event, id) => {
        setStatus(event.target.value)
        axios.put(`http://localhost:5000/api/orders/${id}`, {
            status: status
        }).then(res => { })
    };
    return (
        <div>
            <Typography variant="h4" component="h6" sx={{ textAlign: 'center', mb: 2 }}>
                {user.role === "ADMIN" ? "Order List" : "My Order"}
            </Typography>
            {
                !orders.length ? null : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Total Price</TableCell>
                                <TableCell align="center">Order Time</TableCell>
                                <TableCell align="center">Oder Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) =>
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.order.map(item => item.name + ", ")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {order.order.map(item => item.quantity + ", ")}

                                    </TableCell>
                                    <TableCell align="center">
                                        {displayMoney(calculateTotal(order.order.map((product) => product.price * product.quantity)))}
                                    </TableCell>
                                    <TableCell align="center">
                                        {displayDate(order.createdAt)}
                                    </TableCell>

                                    <TableCell align="center">
                                        {order.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.role === "ADMIN" ?
                                            <FormControl fullWidth>
                                                <Select

                                                    value={order.status}
                                                    onChange={(e) => handleOrderStatus(e, order._id)}
                                                >
                                                    <MenuItem value="Pending">Pending</MenuItem>
                                                    <MenuItem value="Approved">Approved</MenuItem>
                                                    <MenuItem value="Processing">Processing</MenuItem>
                                                    <MenuItem value="Delivery">Delivery</MenuItem>
                                                    <MenuItem value="Cancel">Cancel</MenuItem>
                                                </Select>
                                            </FormControl>
                                            :
                                            <Button variant="contained" color='error' onClick={() => dispatch(deleteOrder(order._id))}>Cancel Order <ClearIcon /></Button>}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

        </div>
    );
};

export default DashboardHome;