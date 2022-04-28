import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Club({ club }) {
    return (
        <Card sx={{ boxShadow: 0, margin: '0 1rem' }}>
            <CardContent sx={{ padding: 0 }}>
                <Typography variant="h3" component="h3" sx={{ marginTop: '.5rem' }}>{club.attributes.name}<br></br>{club.attributes.address}</Typography>
                <Typography variant="h4"></Typography>
            </CardContent>
        </Card>
    );
}

export default Club;