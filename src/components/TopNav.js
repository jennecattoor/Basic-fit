import { Box } from '@mui/system';
import { AppBar, Tooltip, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom'

const TopNav = () => {
    return (
        <Box>
            <AppBar position="static" sx={{ background: 'none', boxShadow: 0 }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1rem 0 1rem' }}>
                    <Tooltip title="Profile">
                        <Link to="/"><AccountCircleIcon sx={{ color: '#2d2d2d' }} /></Link>
                    </Tooltip>
                    <Tooltip title="Notifications">
                        <Badge badgeContent={1} color="primary">
                            <Link to="/notification"><NotificationsIcon sx={{ color: '#2d2d2d' }} /></Link>
                        </Badge>
                    </Tooltip>
                </Box>
            </AppBar >
        </Box >
    );
}

export default TopNav;