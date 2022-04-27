import { Typography, Box, Alert, CircularProgress } from '@mui/material';
import Club from '../components/Club';
import useFetch from '../hooks/useFetch';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Clubs() {

    const { data: clubs, isLoading, error } = useFetch(`${backendUrl}/api/clubs?populate=*`);

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
            <Typography variant="title" component="h1">Clubs</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                <Typography variant="h2">My favourite clubs</Typography>
            </Box>
            {error && <Alert severity="error">Something went wrong with loading your profile</Alert>}
            {clubs && clubs.data.map(club => <Club club={club} />)}
        </>
    );
}

export default Clubs;