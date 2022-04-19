import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function News() {
    return (
        <>
            <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
                <CardContent sx={{ padding: 0 }}>
                    <CardMedia
                        component="img"
                        alt="Air Games"
                        height="140"
                        image="https://picsum.photos/400"
                    />
                    <Typography variant="h2" component="h2">Discover the Air Games</Typography>
                    <Typography variant="body" component="body">Good news! Thanks to our partnership with the Air Games, our members can enjoy a discounted rate</Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default News;