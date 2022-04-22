import { Alert, CircularProgress, Typography, Grid, Box } from '@mui/material';
import WorkoutCard from '../components/WorkoutCard';
import useFetch from '../hooks/useFetch';

function Workouts() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workouts, isLoading, error } = useFetch(`${backendUrl}/api/workouts`)
    console.log(workouts)
    return (
        <>
            <Typography variant="title">Workouts</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                <Typography variant="h2">Recommended</Typography>
                {isLoading && <CircularProgress />}
                {error && <Alert severity="error">Something went wrong</Alert>}
                <Grid container>{workouts && workouts.data.map(workout => <Grid item xs={6} key={workout.id}><WorkoutCard workout={workout.attributes} /></Grid>)}</Grid>
            </Box>
        </>
    );
}

export default Workouts;