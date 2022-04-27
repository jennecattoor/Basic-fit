import { Typography, CircularProgress, Alert, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import useFetch from '../hooks/useFetch';
import WorkoutCard from '../components/WorkoutCard';

function Favourites() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workouts, isLoading, error } = useFetch(`${backendUrl}/api/workouts?populate=*`);
    const { data: profiles, isLoading: profileLoading, error: profileError } = useFetch(`${backendUrl}/api/profiles?populate=*`);

    var favouriteWorkoutsList = [];
    if (profiles) {
        const profileId = parseInt(localStorage.getItem('profileId'));
        const userProfile = profiles.data.find(user => user.id === profileId)
        favouriteWorkoutsList = userProfile.attributes.favouriteWorkouts.data.map(item => item.id)
    }

    if (isLoading || profileLoading) {
        return <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress />
        </Box>
    }

    var favourites = []
    if (workouts) {
        const id = parseInt(localStorage.getItem('id'));
        favourites = workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.attributes.userId === id))
    }
    return (
        <>
            <Typography variant="title" component="h1">Favourites</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                {error && <Alert severity="error">Something went wrong</Alert>}
                {profileError && <Alert severity="error">Something went wrong with loading your profile</Alert>}
                {favourites.length !== 0 && <Typography variant="h2">Favourite workouts</Typography>}
                {favourites.length === 0 && <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh">
                    <Typography variant="body">You don't have any favourites</Typography>
                </Box>}
                <Grid container>
                    {workouts && favourites.map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout.attributes} id={workout.id} color="#fff" favouriteWorkouts={favouriteWorkoutsList} /></Grid>)}
                </Grid>
            </Box>
        </>
    );
}

export default Favourites;