import Typography from '@mui/material/Typography';
import News from "../components/News";
import Image from 'mui-image';
import Box from '@mui/material/Box';
import useFetch from '../hooks/useFetch'

import Testing from '../static/images/1.jpg';

function Home() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { data: username } = useFetch(`${backendUrl}/api/user`)

    return (
        <>
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -10 }}>
                <Image
                    src={Testing}
                    duration={500}
                    height="60vh" />
            </Box>
            <Box sx={{ marginTop: '25rem' }}>
                <Typography variant="title" component="h1" sx={{ background: 'linear-gradient(rgba(255,0,0,0), rgba(255,255,255,1));' }}>Hello<br />{username}</Typography>
                <Box sx={{ background: '#fff' }}>
                    <Typography variant="body" component="h4">Make fitness a basic, check our workouts and Go For It!</Typography>
                    <Typography variant="h2" component="h2">Favourites</Typography>
                    <Typography variant="h2" component="h2">Recommended</Typography>
                    <Typography variant="h2" component="h2">News</Typography>
                    <News />
                </Box>
            </Box>
        </>
    );
}

export default Home;