import { Alert, CircularProgress, Typography, Grid, Box } from '@mui/material';
import WorkoutCard from '../components/WorkoutCard';
import useFetch from '../hooks/useFetch';

function Workouts() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workouts, isLoading, error } = useFetch(`${backendUrl}/api/workouts`);
    return (
        <>
            <Typography variant="title" component="h1">Workouts</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                <Typography variant="h2">New</Typography>
                {isLoading && <CircularProgress />}
                {error && <Alert severity="error">Something went wrong</Alert>}
                <Grid container>{workouts && workouts.data.slice(workouts.data.length - 2, workouts.data.length).reverse().map(workout => <Grid item xs={6} key={workout.id}><WorkoutCard workout={workout.attributes} color="#fff" /></Grid>)}</Grid>
            </Box>
            <Grid container>{workouts && workouts.data.slice(1, 20).map(workout => <Grid item xs={6} key={workout.id}><WorkoutCard workout={workout.attributes} color="#2d2d2d" /></Grid>)}</Grid>
        </>
    );
}

export default Workouts;