import * as React from 'react';
import { Typography, Box } from '@mui/material';
import Browse from "../components/Browse";
import { Link } from 'react-router-dom'


function Explore() {



    return (
        <>
            <Typography variant="title" component="h1">Explore</Typography>
            <Box sx={{ width: '100%' }}>
                <Link to="/workouts" style={{ textDecoration: 'none' }}><Browse title='Workouts' text='Club and home workouts, Audio Coach, and GXR classes for everyone' /></Link>
                <Browse title='Programs' text='Selection of workouts over several weeks for everyone and everywhere' />
                <Browse title='Nutrition' text='Recipes, blogs and advice from nutrition experts' />
                <Browse title='Lifestyle' text='Your inspiration to feel good and happy' />
            </Box>
        </>
    );
}

export default Explore;