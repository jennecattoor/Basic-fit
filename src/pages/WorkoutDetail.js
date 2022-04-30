import { Typography, Card, CardContent, CardMedia, Box, Stack, Divider, Alert, CircularProgress, Fab } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function WorkoutCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: workout, isLoading, error } = useQuery("profiles", async () => {
        const data = await fetch(`${backendUrl}/api/workouts/${id}?populate=*`).then(r => r.json());
        return data;
    });

    if (isLoading) {
        return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    }

    return (
        <>
            {error && <Alert severity="error">Something went wrong</Alert>}
            <Fab onClick={() => navigate(-1)} sx={{ margin: '.7rem' }} size="small" aria-label="favourites" color="secondary">
                <ArrowBackIosNewIcon />
            </Fab>
            <Card sx={{ boxShadow: 0 }}>
                <CardMedia
                    component="video"
                    alt={workout.data.attributes.video.data.attributes.alternativeText}
                    image={workout.data.attributes.video.data.attributes.url}
                    controls
                />
                <CardContent sx={{ padding: 0 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={0}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ padding: '1rem' }}>
                            <AccessTimeIcon />
                            <Typography variant="h3">{workout.data.attributes.duration} min</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>duration</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ padding: '1rem' }}>
                            <EqualizerIcon />
                            <Typography variant="h3">{workout.data.attributes.level}</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>Level</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ padding: '1rem' }}>
                            <LocalFireDepartmentIcon />
                            <Typography variant="h3">{workout.data.attributes.kcal}</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>Kcal</Typography>
                        </Stack>
                    </Stack>
                    <Divider variant="middle" />
                    <Typography variant="title" component="h1">{workout.data.attributes.name}</Typography>
                    <Typography variant="body" component="h4">{workout.data.attributes.description}</Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default WorkoutCard;