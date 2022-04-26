import { Typography, CircularProgress, Alert } from '@mui/material';
import News from "../components/News";
import Image from 'mui-image';
import Box from '@mui/material/Box';
import useFetch from '../hooks/useFetch';

import Testing from '../static/images/1.jpg';

function Home() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: news, isLoading, error } = useFetch(`${backendUrl}/api/news`);

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
                    <Typography variant="body">Make fitness a basic, check our workouts and Go For It!</Typography>
                    <Typography variant="h2" >Favourites</Typography>
                    <Typography variant="h2" >Recommended</Typography>
                    <Typography variant="h2" >News</Typography>
                    {error && <Alert severity="error">Something went wrong</Alert>}
                    {news && news.data.map(article => <News key={article.id} article={article.attributes} />)}
                </Box>
            </Box>
        </>
    );
}

export default Home;