import { Box } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom'

const TopNav = () => {
    return (
        <Box>
            <AppBar position="static" sx={{ background: 'none', boxShadow: 0 }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1rem 0 1rem' }}>
                    <Link to="/"><AccountCircleIcon sx={{ color: '#2d2d2d' }} /></Link>
                    <Link to="/notification"><NotificationsIcon sx={{ color: '#2d2d2d' }} /></Link>
                </Box>
            </AppBar>
        </Box >
    );
}

export default TopNav;