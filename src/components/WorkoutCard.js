import { Typography, Card, CardContent, CardMedia, Box, Fab, CircularProgress, Alert } from '@mui/material/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function WorkoutCard({ workout, color, id }) {

    const { data: profiles, isLoading, error } = useFetch(`${backendUrl}/api/profiles?populate=*`);

    const addFavourites = () => {
        const profileId = parseInt(localStorage.getItem('profileId'));
        const userProfile = profiles.data.find(user => user.id === profileId)
        const favouriteWorkoutsList = userProfile.attributes.favouriteWorkouts.data.map(item => item.id).flat()

        if (!favouriteWorkoutsList.find(item => item === id)) {
            console.log('Item added')
            favouriteWorkoutsList.push(id)
            fetch(`${backendUrl}/api/profiles/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { favouriteWorkouts: favouriteWorkoutsList } }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            console.log('item is already in favourites')
        }
    }

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
                    {error && <Alert severity="error">Something went wrong</Alert>}
                    <Typography variant="h2" sx={{ color: color, padding: '.5rem 0 0 0' }}>{workout.name}</Typography>
                    <Typography variant="body" sx={{ color: color, padding: '0' }}>{workout.level} · {workout.duration} min</Typography>
                </Link >
            </CardContent>
        </Card>
    );
}

export default WorkoutCard;