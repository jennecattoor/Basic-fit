import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Club from '../components/Club';

function Clubs() {
    return (
        <>
            <Typography variant="title" component="h1">Clubs</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                <Typography variant="h2" component="h2">My favourite clubs</Typography>
                <Club />
            </Box>
        </>
    );
}

export default Clubs;