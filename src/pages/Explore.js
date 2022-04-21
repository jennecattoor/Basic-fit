import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Browse from "../components/Browse";

function Explore() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography variant="title">Explore</Typography>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ padding: '1rem' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Browse" value="1" sx={{ borderBottom: 2, borderColor: 'divider', padding: '0 3rem' }} />
                            <Tab label="My favourites" value="2" sx={{ borderBottom: 2, borderColor: 'divider', padding: '0 2rem' }} />
                        </Tabs>
                    </Box>
                    <TabPanel value="1">
                        <Browse title='Workouts' text='Club and home workouts, Audio Coach, and GXR classes for everyone' />
                        <Browse title='Programs' text='Selection of workouts over several weeks for everyone and everywhere' />
                        <Browse title='Nutrition' text='Recipes, blogs and advice from nutrition experts' />
                        <Browse title='Lifestyle' text='Your inspiration to feel good and happy' />
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Box>
        </>
    );
}

export default Explore;