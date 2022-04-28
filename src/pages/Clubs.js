import { Typography, Box, Alert, CircularProgress, Autocomplete, TextField, Button } from '@mui/material';
import Club from '../components/Club';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Clubs() {
    const { data: clubs, isLoading, error } = useFetch(`${backendUrl}/api/clubs?populate=*`);
    const profileId = parseInt(localStorage.getItem('profileId'));
    const [value, setValue] = useState("")
    const [club, setClub] = useState([])


    useEffect(() => {
        if (clubs) {
            setClub(clubs.data.filter(club => club.attributes.favouriteProfiles.data.find(item => item.id === profileId)))
        }
    }, [clubs, profileId]);

    const addFavourite = () => {
        console.log(value)
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
                <Typography variant="h2">My favourite clubs</Typography>
                {clubs && club.map(club => <Club key={club.id} club={club} />)}
            </Box>
            <Typography variant="h3" component="h3" sx={{ marginTop: '1rem' }}>Search for a club!</Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={clubs.data.map(club => club.attributes.name)}
                sx={{ width: 300, margin: '1rem' }}
                onChange={(event, value) => setValue(value)}
                renderInput={(params) => <TextField {...params} label="Search Club" />}
            />
            <Button sx={{ margin: '1rem' }} disableElevation variant="outlined" onClick={() => addFavourite()}>Add to favourites</Button>
        </>
    );
}

export default Clubs;