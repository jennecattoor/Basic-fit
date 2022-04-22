import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Image from '../static/images/workout.jpg';

function Workout() {
    return (
        <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '0 1rem', background: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <CardMedia
                    component="img"
                    alt="Image of Dumbells"
                    image={Image}
                />
                <Typography variant="h2" sx={{ color: '#fff', padding: '.5rem 0 0 0' }}>Easter Workout</Typography>
                <Typography variant="body" sx={{ color: '#fff', padding: '0' }}>Beginner · 21 min</Typography>
            </CardContent>
        </Card>
    );
}

export default Workout;