import { Typography, Card, CardContent, CardMedia, Box, Fab, CircularProgress, Alert } from '@mui/material/';
import { useQueryClient, useQuery, useMutation } from "react-query";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useStore } from '../store';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function WorkoutCard({ workout, color, id }) {
    const [colorFab, setColorFab] = useState("default")

    const jwt = useStore(state => state.jwt);
    const profileId = parseInt(useStore(state => state.profileId));

    const { data: workouts, isLoading, error } = useQuery("workouts", async () => {
        const data = await fetch(`${backendUrl}/api/workouts?populate=*`).then(r => r.json());
        return data;
    });

    const queryClient = useQueryClient()
    const putFavouriteWorkout = async (data) => {
        return await fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { favouriteWorkouts: data } }),
        }).then(r => r.json());
    }

    const mutation = useMutation(putFavouriteWorkout, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries("workouts");
        },
    })

    const checkFavourites = data => {
        const favourites = workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(item => item.id)
        if (!favourites.find(item => item === data)) {
            favourites.push(data)
            setColorFab("primary")
            mutation.mutate(favourites)
        }
        else {
            setColorFab("default")
            const newFavourites = favourites.filter(item => item !== data)
            mutation.mutate(newFavourites)
        }
    }

    useEffect(() => {
        if (workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).find(item => item.id === workout.id)) {
            setColorFab("primary")
        }
    }, [workouts, workout, profileId]);

    if (isLoading) {
        return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    }

    return (
        <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '.5rem 1rem', background: "none" }}>
            {error && <Alert severity="error">Something went wrong with loading the workouts</Alert>}
            <CardContent sx={{ padding: 0 }}>
                <Box sx={{ position: "relative" }} onClick={() => checkFavourites(workout.id)}>
                    <Fab sx={{ position: 'absolute', top: 10, right: 10, boxShadow: 'none', zIndex: 0 }} size="small" aria-label="favourites" color={colorFab}>
                        <FavoriteIcon />
                    </Fab>
                </Box>
                <Link to={`/workoutdetail/${id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        alt={workout.attributes.image.data.attributes.alternativeText}
                        image={workout.attributes.image.data.attributes.formats.small.url}
                    />
                    <Typography variant="h2" sx={{ color: color, padding: '.5rem 0 0 0' }}>{workout.attributes.name}</Typography>
                    <Typography variant="body" sx={{ color: color, padding: '0' }}>{workout.attributes.level} · {workout.attributes.duration} min</Typography>
                </Link >
            </CardContent>
        </Card>
    );
}

export default WorkoutCard;