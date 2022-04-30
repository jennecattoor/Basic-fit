import { Typography, Box, Fab, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { useQueryClient, useQuery, useMutation } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import Image from '../static/images/dumbell.jpg';
import { useStore } from '../store';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Club({ club }) {
    const profileId = parseInt(useStore(state => state.profileId));
    const jwt = localStorage.getItem('jwt')

    const { data: clubs, isLoading, error } = useQuery("clubs", async () => {
        const data = await fetch(`${backendUrl}/api/clubs?populate=*`).then(r => r.json());
        return data;
    });

    const queryClient = useQueryClient()
    const putFavouriteClub = async (data) => {
        const favourites = clubs.data.filter(club => club.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(item => item.id)
        const newFavourites = favourites.filter(id => id !== data)
        return await fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { favouriteClubs: newFavourites } }),
        }).then(r => r.json());
    }

    const mutation = useMutation(putFavouriteClub, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries("clubs");
        },
    })

    const removeClub = data => {
        mutation.mutate(data)
    }

    return (
        <>
            {isLoading && <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>}
            {error && <Alert severity="error">Something went wrong with loading the clubs</Alert>}
            <Card sx={{ maxWidth: 180, boxShadow: 0, margin: '.5rem  1rem' }}>
                <Box sx={{ position: "relative" }} onClick={() => removeClub(club.id)}>
                    <Fab sx={{ position: 'absolute', top: 5, right: 5, boxShadow: 'none', zIndex: 0 }} size="small" aria-label="favourites">
                        <CloseIcon />
                    </Fab>
                </Box>
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
        </>
    );
}

export default Club;