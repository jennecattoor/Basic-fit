import { Box } from '@mui/system';
import { Outlet } from "react-router-dom";
import TopNav from './TopNav';
import NavBar from './NavBar';

const Layout = () => {
    return (<Box sx={{ pb: 7 }}>
        <TopNav />
        <Outlet />
        <NavBar />
    </Box >);
}

export default Layout;