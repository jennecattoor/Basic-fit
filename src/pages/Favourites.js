import { Typography, CircularProgress, Alert, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import WorkoutCard from '../components/WorkoutCard';
import { useQuery } from "react-query";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const profileId = parseInt(localStorage.getItem('profileId'))

function Favourites() {

    const { data: workouts, isLoading, error } = useQuery("workouts", async () => {
        const data = await fetch(`${backendUrl}/api/workouts?populate=*`).then(r => r.json());
        return data;
    });

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

    return (
        <>
            <Typography variant="title" component="h1">Favourites</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                {error && <Alert severity="error">Something went wrong</Alert>}
                {workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).length !== 0 && <Typography variant="h2">Favourite workouts</Typography>}
                {workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).length === 0 && <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh">
                    <Typography variant="body">You don't have any favourites</Typography>
                </Box>}
                <Grid container>
                    {workouts && workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout} id={workout.id} color="#fff" /></Grid>)}
                </Grid>
            </Box>
        </>
    );
}

export default Favourites;