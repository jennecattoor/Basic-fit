import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Image from '../static/images/dumbell.jpg';

function Club({ club }) {
    return (
        <Card sx={{ maxWidth: 180, boxShadow: 0, margin: '0 1rem' }}>
            <CardContent sx={{ padding: 0 }}>
                <CardMedia
                    component="img"
                    alt="Image of Dumbells"
                    height="90"
                    image={Image}
                />
                <Typography variant="h3" component="h3" sx={{ marginTop: '.5rem' }}>Basic-Fit {club.attributes.name}</Typography>
            </CardContent>
        </Card>
    );
}

export default Club;