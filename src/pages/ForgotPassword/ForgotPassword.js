import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors"
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
    usePageTitle("Sign Up | GlassShop");
    const { resetPassword, loading, user, error, setError, success, setSuccess } = useAuth();
    const [data, setData] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const url = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (user?.email) {
            navigate(url, { replace: true })
        }
    })

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(data.email);
        e.target.email.value = "";
    }
    return (
        <Container sx={{ mt: { xs: 8, md: 16 } }}>
            <Box sx={{ border: "1px solid #dedede", my: 5, width: { xs: "100%", md: "50%" }, mx: "auto", bgcolor: grey[50] }}>
                <Box sx={{ p: 5 }}>
                    <Typography variant="h6" component="h6">
                        Reset Your Password
                    </Typography>
                    <Box sx={{ pr: 5 }}>
                        <form style={{ width: "100%", marginBottom: "10px" }} onSubmit={handleSubmit}>
                            <TextField type="email" label="Email" variant="standard" name="email" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                            {
                                loading ?
                                    <Button variant="contained" size="large" disabled>Loading...</Button>
                                    :
                                    <Button variant="contained" size="large" type="submit">Reset Password</Button>
                            }
                        </form>
                    </Box>
                </Box>
                <Box sx={{ bgcolor: grey[100], p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" component="p">
                        Don't have an account? <Link to="/sign-up" style={{ marginLeft: 3, textDecoration: 'none' }}><Button variant="outlined" size="small" >Sign Up</Button></Link>
                    </Typography>
                </Box>
            </Box>
            {
                error && <Snackbar open={true} onClose={() => setError(false)}>
                    <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            {
                success && <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Reset Email Sent. Check your email inbox or spam folder.
                    </Alert>
                </Snackbar>
            }

        </Container >
    );
};

export default ForgotPassword;