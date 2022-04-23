import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Browse({ title, text }) {
    return (
        <Card sx={{ background: '#EAE9E7', boxShadow: 0, margin: ".3rem 0" }}>
            <CardContent >
                <Typography variant="h2">{title}</Typography>
                <Typography variant="body" component="h4">{text}</Typography>
            </CardContent>
        </Card>
    );
}

export default Browse;