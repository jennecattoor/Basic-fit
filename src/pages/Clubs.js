import { Typography, Box, Alert, CircularProgress, Autocomplete, TextField, Button, Grid, Stack } from '@mui/material';
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Club from '../components/Club';
import { useState } from "react";
import { useStore } from '../store';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Clubs() {
    const { handleSubmit, reset } = useForm();
    const [newClub, setNewClub] = useState();
    const jwt = localStorage.getItem('jwt')
    const profileId = parseInt(useStore(state => state.profileId));

    const { data: clubs, isLoading, error } = useQuery("clubs", async () => {
        const data = await fetch(`${backendUrl}/api/clubs?populate=*`).then(r => r.json());
        return data;
    });

    const queryClient = useQueryClient()
    const putFavouriteClub = async (data) => {
        const favourites = clubs.data.filter(club => club.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(item => item.id)
        favourites.push(data.id)
        return await fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { favouriteClubs: favourites } }),
        }).then(r => r.json());
    }

    const mutation = useMutation(putFavouriteClub, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries("clubs");
            reset()
        },
    })

    const onSubmit = () => {
        const selectedClub = clubs.data.filter(club => club.attributes.name === newClub)
        mutation.mutate(selectedClub[0])
    }

    return (
        <>
            {isLoading && <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>}
            {error && <Alert severity="error">Something went wrong with loading the clubs</Alert>}
            <Typography variant="title" component="h1">Clubs</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                <Typography variant="h2" component="h2">My favourite clubs</Typography>
                <Grid container>
                    {clubs && clubs.data.filter(club => club.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(club => <Club key={club.id} club={club} />)}
                </Grid>
            </Box>
            <Typography variant="h2" component="h2">Search for a club</Typography>
            {clubs && <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Autocomplete
                    id="club"
                    disablePortal
                    required
                    options={clubs && clubs.data.filter(club => !club.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(club => club.attributes.name)}
                    sx={{ margin: '1rem' }}
                    onChange={(event, value) => setNewClub(value)}
                    renderInput={(params) => <TextField {...params} label="Search Club" />}
                />
                <Button type="submit" sx={{ margin: '1rem' }} disabled={!newClub} disableElevation variant="outlined">Add to favourites</Button>
            </Stack>}
        </>

    );
}
