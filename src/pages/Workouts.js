import { Alert, CircularProgress, Typography, Grid, Box } from '@mui/material';
import WorkoutCard from '../components/WorkoutCard';
import { useQuery } from "react-query";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Workouts() {
    const { data: workouts, isLoading, error } = useQuery("workouts", async () => {
        const data = await fetch(`${backendUrl}/api/workouts?populate=*`).then(r => r.json());
        return data;
    });

    return (
        <>
            {isLoading && <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>}
            {error && <Alert severity="error">Something went wrong with loading the workouts</Alert>}
            <Typography variant="title" component="h1">Workouts</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                <Typography variant="h2">New</Typography>
                <Grid container>{workouts && workouts.data.slice(workouts.data.length - 2, workouts.data.length).reverse().map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout} id={workout.id} color="#fff" /></Grid>)}</Grid>
            </Box>
            <Typography variant="h2">All</Typography>
            <Grid container>{workouts && workouts.data.slice(0, workouts.data.length - 2).map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout} id={workout.id} color="#2d2d2d" /></Grid>)}</Grid>
        </>
    );
}

export default Workouts;