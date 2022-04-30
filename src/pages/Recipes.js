import { Alert, CircularProgress, Typography, Grid, Box } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { useQuery } from "react-query";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Recipes() {
    const { data: recipes, isLoading, error } = useQuery("recipes", async () => {
        const data = await fetch(`${backendUrl}/api/recipes?populate=*`).then(r => r.json());
        return data;
    });

    return (
        <>
            {isLoading && <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>}
            {error && <Alert severity="error">Something went wrong with loading the recipes</Alert>}
            <Typography variant="title" component="h1">Nutrition</Typography>
            <Box sx={{ color: '#fff', background: 'linear-gradient(0.25turn, #FF9D26, #FE7000);' }}>
                <Typography variant="h2">New</Typography>
                <Grid container>{recipes && recipes.data.slice(recipes.data.length - 2, recipes.data.length).reverse().map(recipe => <Grid item xs={6} key={"recipe" + recipe.id}><RecipeCard recipe={recipe} id={recipe.id} color="#fff" /></Grid>)}</Grid>
            </Box>
            <Typography variant="h2">All</Typography>
            <Grid container>{recipes && recipes.data.slice(0, recipes.data.length - 2).map(recipe => <Grid item xs={6} key={"recipe" + recipe.id}><RecipeCard recipe={recipe} id={recipe.id} color="#2d2d2d" /></Grid>)}</Grid>
        </>
    );
}

export default Recipes;