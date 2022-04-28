import { Typography, Box, Alert, CircularProgress, Autocomplete, TextField, Button, Grid } from '@mui/material';
import Club from '../components/Club';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Clubs() {
    const { data: clubs, isLoading, error } = useFetch(`${backendUrl}/api/clubs?populate=*`);
    const profileId = parseInt(localStorage.getItem('profileId'));
    const [value, setValue] = useState("")
    const [club, setClub] = useState([])
    const [search, setSearch] = useState([])

    useEffect(() => {
        if (clubs) {
            setSearch(clubs.data.filter(club => !club.attributes.favouriteProfiles.data.find(item => item.id === profileId)))
            setClub(clubs.data.filter(club => club.attributes.favouriteProfiles.data.find(item => item.id === profileId)))
        }

    }, [clubs, profileId]);


    const addFavourite = (value) => {
        const selectedClub = clubs.data.filter(club => club.attributes.name === value)
        const favourites = club.map(item => item.id)
        favourites.push(selectedClub[0].id)
        fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { favouriteClubs: favourites } }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (isLoading) {
        return <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress />
        </Box>
    }
    return (
        <>
            <Typography variant="title" component="h1">Clubs</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);', paddingBottom: '1.5rem' }}>
                {error && <Alert severity="error">Something went wrong with loading your profile</Alert>}
                <Typography variant="h2" component="h2">My favourite clubs</Typography>
                <Grid container>
                    {club && club.map(club => <Club key={club.id} club={club} />)}
                </Grid>
            </Box>
            <Typography variant="h2" component="h2">Search for a club!</Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={search.map(club => club.attributes.name)}
                sx={{ width: 300, margin: '1rem' }}
                onChange={(event, value) => setValue(value)}
                renderInput={(params) => <TextField {...params} label="Search Club" />}
            />
            <Button sx={{ margin: '1rem' }} disableElevation variant="outlined" disabled={!value} onClick={() => addFavourite(value)}>Add to favourites</Button>
        </>
    );
}

export default Clubs;