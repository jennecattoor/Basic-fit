import { Typography, Card, CardContent } from '@mui/material/';

function ExerciseCard() {

    return (
        <Card sx={{ boxShadow: 0, margin: '.5rem 0', background: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                {/* <CardMedia
                    component="img"
                    alt={exercise.image.data.attributes.alternativeText}
                    image={exercise.image.data.attributes.formats.small.url}
                /> */}
                <Typography variant="h3" component="h3">Testing</Typography>
                <Typography variant="body">Testing · Testing min</Typography>
            </CardContent>
        </Card >
    );
}

export default ExerciseCard;