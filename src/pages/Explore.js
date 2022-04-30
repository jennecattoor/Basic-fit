import { Typography, Box } from '@mui/material';
import Browse from "../components/Browse";
import { Link } from 'react-router-dom'

function Explore() {

    return (
        <>
            <Typography variant="title" component="h1">Explore</Typography>
            <Box sx={{ width: '100%' }}>
                <Link to="/workouts" style={{ textDecoration: 'none' }}><Browse title='Workouts' text='Club and home workouts, Audio Coach, and GXR classes for everyone' /></Link>
                <Link to="/recipes" style={{ textDecoration: 'none' }}><Browse title='Nutrition' text='Recipes, blogs and advice from nutrition experts' /></Link>
                <Link to="/favourites" style={{ textDecoration: 'none' }}><Browse title='Favourites' text='Find your favourite workouts and nutritions here' /></Link>
            </Box>
        </>
    );
}

export default Explore;