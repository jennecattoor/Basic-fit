import { Typography, Card, CardContent, CardMedia } from '@mui/material';

function News({ article }) {
    return (
        <Card sx={{ maxWidth: 500, margin: '0 1rem 2rem 1rem' }}>
            <CardContent sx={{ padding: 0 }}>
                <CardMedia
                    component="img"
                    alt={article.image.data.attributes.alternativeText}
                    height="180"
                    image={article.image.data.attributes.formats.small.url}
                />
                <Typography variant="h2" component="h2">{article.title}</Typography>
                <Typography variant="body" component="h4">{article.article}</Typography>
            </CardContent>
        </Card>
    );
}

export default News;