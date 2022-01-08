import { Grid, TextField, Typography, Button, Snackbar, Alert, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { grey } from '@mui/material/colors';
import usePageTitle from '../../../hooks/usePageTitle';
import useAuth from '../../../hooks/useAuth';
import axios from "axios";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const AddProduct = () => {
    usePageTitle("Add Glass | GlassShop");
    const [data, setData] = useState({});
    const { loading, setLoading, error, setError, success, setSuccess } = useAuth();

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }
    const handleSize = (e) => {
        const field = e.target.name;
        const size = e.target.value.split(',');
        const newData = { ...data };
        newData[field] = size;
        setData(newData);
    }
    const handleCheck = (e) => {
        const field = e.target.name;
        const value = e.target.checked;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }
    const handleFile = (e) => {
        const field = e.target.name;
        const image = e.target.files[0];
        const newData = { ...data };
        newData[field] = image;
        setData(newData);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const photo = data.image;
        const title = data.name;
        let body = new FormData();
        body.set('key', process.env.REACT_APP_IMGBB_API_KEY);
        body.append('image', photo);
        body.append('name', title);

        await axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
        }).then(res => {
            data.image = res.data.data.display_url;
        }).catch((error) => {
            setError(error.message)
        });

        axios.post('http://localhost:5000/api/products', {
            product: data
        }).then(res => {
            if (res) {
                setSuccess(true);
            }
        }).catch(error => {
            if (error) {
                setError(error.message);
            }
        }).finally(() => setLoading(false))
    }
    return (
        <div>
            <Typography variant='h4' sx={{ my: 4, fontWeight: 'medium', color: grey[700] }}>
                Add Glass
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <TextField label="Glass Name" variant="standard" name="name" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Brand" variant="standard" name="brand" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={12}>
                        <TextField
                            label="Glass Description"
                            multiline
                            rows={4}
                            variant="standard"
                            name="description"
                            fullWidth
                            onChange={handleInput}
                            required
                        />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Max Quantity" type="number" variant="standard" name="maxQuantity" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Size" variant="standard" name="size" fullWidth sx={{ display: "block", my: 2 }} onChange={handleSize} helperText="Enter size separate by comma (,)" required />
                    </Grid>

                    <Grid item md={6}>
                        <TextField type="file" variant="outlined" name="image" sx={{ my: 2 }} label="Image" focused onChange={handleFile} />
                    </Grid>

                    <Grid item md={6}>
                        <TextField label="Price" type="number" variant="standard" name="price" fullWidth sx={{ display: "block", my: 2 }} onChange={handleInput} required />
                    </Grid>

                    <Grid item md={6}>
                        <label>This glass is Recommended</label>
                        <Checkbox {...label} icon={<CheckCircleOutlineIcon />} checkedIcon={< CheckCircleIcon />} name="isRecommended" onChange={handleCheck} />
                    </Grid>

                    <Grid item md={6}>
                        <label>This glass is Featured</label>
                        <Checkbox {...label} icon={<CheckCircleOutlineIcon />} checkedIcon={< CheckCircleIcon />} name="isFeatured" onChange={handleCheck} />
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit" size="large" sx={{ my: 2 }}>
                    Submit
                </Button>
            </form>
            {
                error && <Snackbar open={true} onClose={() => setError(false)}>
                    <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            {
                success && <Snackbar open={true} onClose={() => setSuccess(false)}>
                    <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Add Glass Success
                    </Alert>
                </Snackbar>
            }
        </div>
    );
};

export default AddProduct;