import { Typography, CircularProgress, Alert, Grid } from '@mui/material';
import News from "../components/News";
import Image from 'mui-image';
import Box from '@mui/material/Box';
import useFetch from '../hooks/useFetch';
import WorkoutCard from '../components/WorkoutCard';

import Testing from '../static/images/1.jpg';

function Home() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const id = parseInt(localStorage.getItem('id'));
    const { data: news, isLoading, error } = useFetch(`${backendUrl}/api/news?populate=*`);
    const { data: workouts, isLoading: workoutLoading, error: workoutError } = useFetch(`${backendUrl}/api/workouts?populate=*`);
    const { data: profiles, isLoading: profileLoading, error: profileError } = useFetch(`${backendUrl}/api/profiles?populate=*`);

    var favourites = []
    if (workouts) {
        favourites = workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.attributes.userId === id))
    }

    var favouriteWorkoutsList = [];
    if (profiles) {
        const profileId = parseInt(localStorage.getItem('profileId'));
        const userProfile = profiles.data.find(user => user.id === profileId)
        favouriteWorkoutsList = userProfile.attributes.favouriteWorkouts.data.map(item => item.id)
    }


    if (isLoading || profileLoading || workoutLoading) {
        return <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress />
        </Box>
    }

    return (
        <>
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -10 }}>
                <Image
                    src={Testing}
                    duration={500}
                    height="80rem" />
            </Box>
            <Box sx={{ marginTop: '25rem' }}>
                <Typography variant="title" component="h1" sx={{ background: 'linear-gradient(rgba(255,0,0,0), rgba(255,255,255,1));' }}>Hello<br />{localStorage.getItem('username')}</Typography>
                <Box sx={{ background: '#fff', paddingBottom: '2rem' }}>
                    <Typography variant="body" component="h4">Make fitness a basic, check our workouts and Go For It!</Typography>
                    <Typography variant="h2" >Favourites</Typography>
                    {profileError && <Alert severity="error">Something went wrong with loading your profile</Alert>}
                    {workoutError && <Alert severity="error">Something went wrong with loading your favourite workouts</Alert>}
                    {favourites.length === 0 && <Typography variant="body">You don't have any favourites</Typography>}
                    <Grid container>
                        {workouts && favourites.map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout.attributes} id={workout.id} color="#2d2d2d" favouriteWorkouts={favouriteWorkoutsList} /></Grid>)}
                    </Grid>
                    <Typography variant="h2" >News</Typography>
                    {error && <Alert severity="error">Something went wrong</Alert>}
                    {news && news.data.map(article => <News key={article.id} article={article.attributes} />)}
                </Box>
            </Box>
        </>
    );
}

export default Home;