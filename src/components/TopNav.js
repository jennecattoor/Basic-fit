import { Box } from '@mui/system';
import { AppBar, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'

const TopNav = () => {
    return (
        <Box>
            <AppBar position="static" sx={{ background: 'none', boxShadow: 0 }} >
                <Box sx={{ padding: '1rem 1rem 0 1rem' }}>
                    <Tooltip title="Profile">
                        <Link to="/"><AccountCircleIcon sx={{ color: '#2d2d2d' }} /></Link>
                    </Tooltip>
                </Box>
            </AppBar >
        </Box >
    );
}

export default TopNav;