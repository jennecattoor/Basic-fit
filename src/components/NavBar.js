import FitnessIcon from '@mui/icons-material/FitnessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels width="xs">
                <BottomNavigationAction component={Link} label="Home" to="/home" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} label="Explore" to="/explore" icon={<FitnessIcon />} />
                <BottomNavigationAction component={Link} label="Favourites" to="/favourites" icon={<FavoriteIcon />} />
                <BottomNavigationAction component={Link} label="Clubs" to="/clubs" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </Paper>
    );
}

export default NavBar;