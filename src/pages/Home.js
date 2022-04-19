import Typography from '@mui/material/Typography';
import News from "../components/News";

function Home() {
    return (
        <>
            <Typography variant="title" component="h1">Hello<br />Jenne</Typography>
            <Typography variant="body" component="h4">Make fitness a basic, check our workouts and Go For It!</Typography>
            <Typography variant="h2" component="h2">Recommended</Typography>
            <Typography variant="h2" component="h2">Favourites</Typography>
            <Typography variant="h2" component="h2">News</Typography>
            <News />
        </>
    );
}

export default Home;