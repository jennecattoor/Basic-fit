import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Clubs() {
    return (
        <>
            <Typography variant="title" component="h1">Clubs</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                <Typography variant="h2" component="h2">My favourite clubs</Typography>
            </Box>
        </>
    );
}

export default Clubs;