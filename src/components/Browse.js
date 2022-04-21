import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Browse({ title, text }) {
    return (
        <Card sx={{ background: '#EAE9E7', boxShadow: 0, padding: '.5rem 0', margin: '.3rem 0' }}>
            <CardContent sx={{ padding: 0 }}>
                <Typography sx={{ paddingBottom: 0 }} variant="h2">{title}</Typography>
                <Typography sx={{ background: '#EAE9E7', paddingBottom: '0' }} variant="body">{text}</Typography>
            </CardContent>
        </Card>
    );
}

export default Browse;