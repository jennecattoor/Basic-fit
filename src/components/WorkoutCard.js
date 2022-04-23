import { Typography, Card, CardContent, CardMedia } from '@mui/material/';
import Image from '../static/images/workout.jpg';
import { Link } from 'react-router-dom'

function WorkoutCard({ workout }) {
    return (
        <Link to="/workoutdetail" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '0 1rem', background: "none" }}>
                <CardContent sx={{ padding: 0 }}>
                    <CardMedia
                        component="img"
                        alt="Image of Dumbells"
                        image={Image}
                    />
                    <Typography variant="h2" sx={{ color: '#fff', padding: '.5rem 0 0 0' }}>{workout.name}</Typography>
                    <Typography variant="body" sx={{ color: '#fff', padding: '0' }}>{workout.level} · {workout.duration} min</Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default WorkoutCard;