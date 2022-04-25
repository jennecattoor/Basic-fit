import { Typography, Card, CardContent, CardMedia } from '@mui/material/';
import { Link } from 'react-router-dom'

function WorkoutCard({ workout, color, id }) {
    return (
        <Link to={`/workoutdetail/${id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '.5rem 1rem', background: "none" }}>
                <CardContent sx={{ padding: 0 }}>
                    <CardMedia
                        component="img"
                        alt={workout.image.data.attributes.alternativeText}
                        image={workout.image.data.attributes.formats.small.url}
                    />
                    <Typography variant="h2" sx={{ color: color, padding: '.5rem 0 0 0' }}>{workout.name}</Typography>
                    <Typography variant="body" sx={{ color: color, padding: '0' }}>{workout.level} · {workout.duration} min</Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default WorkoutCard;