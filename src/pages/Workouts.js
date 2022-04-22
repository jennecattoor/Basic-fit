import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Workout from '../components/Workout'

function Workouts() {
    return (
        <>
            <Typography variant="title">Workouts</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                <Typography variant="h2">Recommended</Typography>
                <Workout />
            </Box>
        </>
    );
}

export default Workouts;