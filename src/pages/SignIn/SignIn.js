import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors"
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import usePageTitle from "../../hooks/usePageTitle";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
    usePageTitle("Sign in | GlassShop");
    const { signIn, loading, user, error, googleSignIn } = useAuth();
    const [data, setData] = useState({});
    const [open, setOpen] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const url = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (user?.email) {
            navigate(url, { replace: true })
        }
    })
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(data.email, data.password);
    }
    return (
        <Container sx={{ mt: { xs: 8, md: 16 } }}>
            <Box sx={{ border: "1px solid #dedede", my: 5, width: { xs: "100%", md: "80%" }, mx: "auto", bgcolor: grey[50] }}>
                <Grid container sx={{ alignItems: "center", p: { xs: 2, md: 5 } }}>
                    <Grid item md={8} sx={{ position: "relative" }}>
                        <Typography variant="h6" component="h6">
                            Sign in to GlassShop
                        </Typography>
                        <Box sx={{ pr: 5 }}>
                            <form style={{ width: "100%", marginBottom: "10px" }} onSubmit={handleSubmit}>
                                <TextField type="email" label="Email" variant="standard" name="email" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                                <TextField type="password" label="Password" variant="standard" name="password" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                                {
                                    loading ?
                                        <Button variant="contained" size="large" disabled>Loading... <LoginIcon /></Button>
                                        :
                                        <Button variant="contained" size="large" type="submit">Sign In <LoginIcon /></Button>
                                }
                            </form>
                            <Link to="/forgot-password" style={{ textDecoration: "none" }}>Forgot Password?</Link>
                        </Box>
                        <hr style={{ width: "1px", height: "100%", position: "absolute", top: 0, right: 0 }} />
                    </Grid>

                    <Grid item md={4}>
                        {
                            loading ? <Button variant="contained" size="large" sx={{ float: 'right' }} disabled><GoogleIcon sx={{ mr: 1 }} />Loading... </Button>
                                :
                                <Button variant="contained" size="large" sx={{ float: 'right' }} onClick={googleSignIn}><GoogleIcon sx={{ mr: 1 }} />Sign in with Google </Button>
                        }
                    </Grid>
                </Grid>

                <Box sx={{ bgcolor: grey[100], p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" component="p">
                        Don't have an account? <Link to="/sign-up" style={{ marginLeft: 3, textDecoration: 'none' }}><Button variant="outlined" size="small" >Sign Up</Button></Link>
                    </Typography>
                </Box>
            </Box>
            {
                error && <Snackbar open={open} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
        </Container >
    );
};

export default SignIn;