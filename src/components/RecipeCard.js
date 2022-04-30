import { Typography, Card, CardContent, CardMedia, Box, Fab, CircularProgress, Alert, Link } from '@mui/material/';
import { useQueryClient, useQuery, useMutation } from "react-query";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import { useStore } from '../store';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function RecipeCard({ recipe, color, id }) {
    const [colorFab, setColorFab] = useState("default")

    const jwt = useStore(state => state.jwt);
    const profileId = parseInt(useStore(state => state.profileId));

    const { data: recipes, isLoading, error } = useQuery("recipes", async () => {
        const data = await fetch(`${backendUrl}/api/recipes?populate=*`).then(r => r.json());
        return data;
    });

    const queryClient = useQueryClient()
    const putFavouriterecipe = async (data) => {
        return await fetch(`${backendUrl}/api/profiles/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { favouriteRecipes: data } }),
        }).then(r => r.json());
    }

    const mutation = useMutation(putFavouriterecipe, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries("recipes");
        },
    })

    const checkFavourites = data => {
        const favourites = recipes.data.filter(recipe => recipe.attributes.favouriteProfiles.data.find(item => item.id === profileId)).map(item => item.id)
        if (!favourites.find(item => item === data)) {
            favourites.push(data)
            setColorFab("primary")
            mutation.mutate(favourites)
        }
        else {
            setColorFab("default")
            const newFavourites = favourites.filter(item => item !== data)
            mutation.mutate(newFavourites)
        }
    }

    useEffect(() => {
        if (recipes && recipes.data.filter(recipe => recipe.attributes.favouriteProfiles.data.find(item => item.id === profileId)).find(item => item.id === recipe.id)) {
            setColorFab("primary")
        }
    }, [recipes, recipe, profileId]);


    return (
        <>
            {isLoading && <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>}
            {error && <Alert severity="error">Something went wrong with loading the recipes</Alert>}
            <Card sx={{ maxWidth: 225, boxShadow: 0, margin: '.5rem 1rem', background: "none" }}>
                <CardContent sx={{ padding: 0 }}>
                    <Box sx={{ position: "relative" }} onClick={() => checkFavourites(recipe.id)}>
                        <Fab sx={{ position: 'absolute', top: 10, right: 10, boxShadow: 'none', zIndex: 0 }} size="small" aria-label="favourites" color={colorFab}>
                            <FavoriteIcon />
                        </Fab>
                    </Box>
                    <Link href={`https://fitandfeelgood.co.uk/2020/11/avocado-tapenade-egg-toast/`} style={{ textDecoration: 'none' }}>
                        <CardMedia
                            component="img"
                            alt={recipe.attributes.image.data.attributes.alternativeText}
                            image={recipe.attributes.image.data.attributes.formats.small.url}
                        />
                        <Typography variant="h2" sx={{ color: color, padding: '.5rem 0 0 0' }}>{recipe.attributes.name}</Typography>
                        <Typography variant="body" sx={{ color: color, padding: '0' }}>{recipe.attributes.level} · {recipe.attributes.duration} min</Typography>
                    </Link >
                </CardContent>
            </Card>
        </>
    );
}

export default RecipeCard;