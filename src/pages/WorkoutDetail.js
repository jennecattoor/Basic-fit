import { Typography, Card, CardContent, Box, Stack, Divider, Alert, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useFetch from '../hooks/useFetch';
import { useParams } from "react-router-dom";

import Image from 'mui-image';
import Testing from '../static/images/workout.jpg';

function WorkoutCard() {
    const { id } = useParams();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: workout, isLoading, error } = useFetch(`${backendUrl}/api/workouts/${id}`);

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            {error && <Alert severity="error">Something went wrong</Alert>}
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -10 }}>
                <Image
                    src={Testing}
                    duration={500} />
            </Box>
            <Card sx={{ boxShadow: 0, marginTop: '25rem' }}>
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