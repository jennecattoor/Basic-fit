import { Typography, Card, CardContent, CardMedia, Box, Fab } from '@mui/material/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function WorkoutCard({ workout, color, id }) {

    const addFavourites = () => {
        const profileId = localStorage.getItem('profileId');
        fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { favouriteWorkouts: [id] } }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '.5rem 1rem', background: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Box sx={{ position: "relative" }} onClick={() => addFavourites()}>
                    <Fab sx={{ position: 'absolute', top: 10, right: 10, boxShadow: 'none', zIndex: 0 }} size="small" aria-label="favourites" >
                        <FavoriteIcon />
                    </Fab>
                </Box>
                <Link to={`/workoutdetail/${id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        alt={workout.image.data.attributes.alternativeText}
                        image={workout.image.data.attributes.formats.small.url}
                    />
                    <Typography variant="h2" sx={{ color: color, padding: '.5rem 0 0 0' }}>{workout.name}</Typography>
                    <Typography variant="body" sx={{ color: color, padding: '0' }}>{workout.level} · {workout.duration} min</Typography>
                </Link >
            </CardContent>
        </Card>
    );
}

export default WorkoutCard;