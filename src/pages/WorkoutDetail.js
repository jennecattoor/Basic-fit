import { Typography, Card, CardContent, Box, Stack, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import Image from 'mui-image';
import Testing from '../static/images/workout.jpg';

function WorkoutCard() {
    return (
        <>
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
                            <Typography variant="h3">21 min</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>duration</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ padding: '1rem' }}>
                            <EqualizerIcon />
                            <Typography variant="h3">Beginner</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>Level</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ padding: '1rem' }}>
                            <LocalFireDepartmentIcon />
                            <Typography variant="h3">110</Typography>
                            <Typography variant="body" sx={{ marginTop: '-.3rem' }}>Kcal</Typography>
                        </Stack>
                    </Stack>
                    <Divider variant="middle" />
                    <Typography variant="title" component="h1">Easter Workout</Typography>
                    <Typography variant="body" component="h4">
                        Easter is coming up and you don't want
                        to worry about the extra calories when
                        spring is already here. This workout will
                        help you get in shape before easter so
                        you can enjoy your brunch guilt-free!
                        If you are doing this workout at home
                        use a heavy object or just bodyweight
                        either way, get ready to warm the body
                        to pick up as many easter eggs as you
                        can!</Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default WorkoutCard;