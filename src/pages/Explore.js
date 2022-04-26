import * as React from 'react';
import { Typography, Box, Tabs, Tab, CircularProgress, Alert, Grid } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Browse from "../components/Browse";
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import WorkoutCard from '../components/WorkoutCard';

function Explore() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workouts, isLoading, error } = useFetch(`${backendUrl}/api/workouts?populate=*`);

    if (isLoading) {
        return <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress />
        </Box>
    }

    const id = parseInt(localStorage.getItem('id'));
    const favourites = workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.attributes.userId === id))

    return (
        <>
            <Typography variant="title" component="h1">Explore</Typography>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ padding: '1rem' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Browse" value="1" sx={{ borderBottom: 2, borderColor: 'divider', padding: '0 3rem' }} />
                            <Tab label="My favourites" value="2" sx={{ borderBottom: 2, borderColor: 'divider', padding: '0 2rem' }} />
                        </Tabs>
                    </Box>
                    <TabPanel value="1">
                        <Link to="/workouts" style={{ textDecoration: 'none' }}><Browse title='Workouts' text='Club and home workouts, Audio Coach, and GXR classes for everyone' /></Link>
                        <Browse title='Programs' text='Selection of workouts over several weeks for everyone and everywhere' />
                        <Browse title='Nutrition' text='Recipes, blogs and advice from nutrition experts' />
                        <Browse title='Lifestyle' text='Your inspiration to feel good and happy' />
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
                        {error && <Alert severity="error">Something went wrong</Alert>}
                        {workouts && <Typography variant="h2">Favourite workouts</Typography>}
                        <Grid container>
                            {workouts && favourites.map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout.attributes} id={workout.id} color="#2d2d2d" /></Grid>)}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}

export default Explore;