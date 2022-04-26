import { Typography, Card, CardContent, CardMedia, Alert, CircularProgress, Box } from '@mui/material/';
import useFetch from '../hooks/useFetch';

function ExerciseCard() {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: exercise, isLoading, error } = useFetch(`${backendUrl}/api/exercises?populate=*`);

    if (!isLoading) {
        console.log(exercise.data.map(item => item.attributes))
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
        <Card sx={{ boxShadow: 0, margin: '.5rem 0', background: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                {error && <Alert severity="error">Something went wrong</Alert>}
                {/* <CardMedia
                    component="img"
                    alt={exercise.image.data.attributes.alternativeText}
                    image={exercise.image.data.attributes.formats.small.url}
                /> */}
                <Typography variant="h3" component="h3">Testing</Typography>
                <Typography variant="body">Testing · Testing min</Typography>
            </CardContent>
        </Card >
    );
}

export default ExerciseCard;