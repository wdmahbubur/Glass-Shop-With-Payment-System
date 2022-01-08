import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { grey } from "@mui/material/colors"
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";

const SignUp = () => {
    usePageTitle("Sign Up | GlassShop");
    const { signUp, loading, user, error, googleSignIn } = useAuth();
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
        signUp(data.name, data.email, data.password);
    }
    return (
        <Container sx={{ mt: { xs: 8, md: 16 } }}>
            <Box sx={{ border: "1px solid #dedede", my: 5, width: { xs: "100%", md: "80%" }, mx: "auto", bgcolor: grey[50] }}>
                <Grid container sx={{ alignItems: "center", p: { xs: 2, md: 5 } }}>
                    <Grid item md={8} sx={{ position: "relative" }}>
                        <Typography variant="h6" component="h6">
                            Sign up to GlassShop
                        </Typography>
                        <Box sx={{ pr: 5 }}>
                            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                <TextField label="Name" variant="standard" name="name" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                                <TextField type="email" label="Email" variant="standard" name="email" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                                <TextField type="password" label="Password" variant="standard" name="password" fullWidth sx={{ display: "block", my: 3 }} onChange={handleInput} required />

                                {
                                    loading ?
                                        <Button variant="contained" size="large" disabled >Loading... <ArrowForwardIcon /></Button>
                                        :
                                        <Button variant="contained" size="large" type="submit">Sign Up <ArrowForwardIcon /></Button>
                                }

                            </form>
                        </Box>
                        <hr style={{ width: "1px", height: "100%", position: "absolute", top: 0, right: 0 }} />
                    </Grid>
                    <Grid item md={4}>
                        {
                            loading ? <Button variant="contained" size="large" sx={{ float: 'right' }} disabled><GoogleIcon sx={{ mr: 1 }} />Loading... </Button>
                                :
                                <Button variant="contained" size="large" sx={{ float: 'right' }} onClick={googleSignIn}><GoogleIcon sx={{ mr: 1 }} />Sign up with Google </Button>
                        }

                    </Grid>
                </Grid>
                <Box sx={{ bgcolor: grey[100], p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" component="p">
                        Already have an account? <Link to="/sign-in" style={{ marginLeft: 3, textDecoration: 'none' }}><Button variant="outlined" size="small" >Sign In</Button></Link>
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

export default SignUp;