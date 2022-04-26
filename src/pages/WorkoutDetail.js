import { Typography, Card, CardContent, Box, Stack, Divider, Alert, CircularProgress, Fab } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useFetch from '../hooks/useFetch';
import { useParams, useNavigate } from "react-router-dom";
import Image from 'mui-image';
import ExerciseCard from '../components/ExerciseCard'

function WorkoutCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workout, isLoading, error } = useFetch(`${backendUrl}/api/workouts/${id}?populate=*`);

    const { data: exercise, isLoading: loading, error: isError } = useFetch(`${backendUrl}/api/exercises?populate=*`);

    if (!loading) {
        console.log(exercise.data.map(item => item.attributes))
    }



    if (isLoading || loading) {
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
        <>
            {error && <Alert severity="error">Something went wrong</Alert>}
            {isError && <Alert severity="error">Something went wrong</Alert>}
            <Fab onClick={() => navigate(-1)} sx={{ position: 'absolute', top: 10, left: 10, boxShadow: 'none', zIndex: 0 }} size="small" aria-label="favourites" >
                <ArrowBackIosNewIcon />
            </Fab>
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -10 }}>
                {<Image
                    alt={workout.data.attributes.image.data.attributes.alternativeText}
                    src={workout.data.attributes.image.data.attributes.formats.small.url}
                    duration={600} />}
            </Box>
            <Card sx={{ boxShadow: 0, marginTop: '30rem' }}>
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
                    <Typography variant="h2" component="h2" sx={{ marginTop: '2rem' }}>What you'll do</Typography>
                    <ExerciseCard />
                </CardContent>
            </Card>
        </>
    );
}

export default WorkoutCard;