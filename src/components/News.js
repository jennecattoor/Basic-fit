import { Typography, Card, CardContent, CardMedia } from '@mui/material';

function News({ article }) {
    return (
        <Card sx={{ maxWidth: 500, margin: '0 1rem' }}>
            <CardContent sx={{ padding: 0 }}>
                <CardMedia
                    component="img"
                    alt="Air Games"
                    height="180"
                    image="https://picsum.photos/400"
                />
                <Typography variant="h2" component="h2">{article.title}</Typography>
                <Typography variant="body" component="h4">{article.article}</Typography>
            </CardContent>
        </Card>
    );
}

export default News;