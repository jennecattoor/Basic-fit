import { Typography, CircularProgress, Alert, Grid } from '@mui/material';
import News from "../components/News";
import Image from 'mui-image';
import Box from '@mui/material/Box';
import WorkoutCard from '../components/WorkoutCard';
import { useQuery } from "react-query";

import Testing from '../static/images/1.jpg';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const profileId = parseInt(localStorage.getItem('profileId'));

function Home() {
    const { data: news, isLoading: newsLoading, error: newsError } = useQuery("news", async () => {
        const data = await fetch(`${backendUrl}/api/news?populate=*`).then(r => r.json());
        return data;
    });

    const { data: workouts, isLoading, error } = useQuery("workouts", async () => {
        const data = await fetch(`${backendUrl}/api/workouts?populate=*`).then(r => r.json());
        return data;
    });

    if (isLoading || newsLoading) {
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
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -10 }}>
                <Image
                    src={Testing}
                    duration={500}
                    height="80rem" />
            </Box>
            <Box sx={{ marginTop: '25rem' }}>
                <Typography variant="title" component="h1" sx={{ background: 'linear-gradient(rgba(255,0,0,0), rgba(255,255,255,1));' }}>Hello<br />{localStorage.getItem('username')}</Typography>
                <Box sx={{ background: '#fff', paddingBottom: '2rem' }}>
                    <Typography variant="body" component="h4">Make fitness a basic, check our workouts and Go For It!</Typography>
                    <Typography variant="h2" >Favourites</Typography>
                    {error && <Alert severity="error">Something went wrong with loading the workouts</Alert>}
                    {workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).length === 0 && <Typography variant="body">You don't have any favourites</Typography>}
                    <Grid container>
                        {workouts && workouts.data.filter(workout => workout.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(workout => <Grid item xs={6} key={"workout" + workout.id}><WorkoutCard workout={workout} id={workout.id} color="#2d2d2d" /></Grid>)}
                    </Grid>
                    <Typography variant="h2" >News</Typography>
                    {newsError && <Alert severity="error">Something went wrong</Alert>}
                    {news && news.data.map(article => <News key={article.id} article={article.attributes} />)}
                </Box>
            </Box>
        </>
    );
}

export default Home;