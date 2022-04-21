import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Coach() {
    return (
        <>
            <Typography variant="title" >Coach</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                <Typography variant="h2" >Tips & Tricks</Typography>
            </Box>
        </>
    );
}

export default Coach;