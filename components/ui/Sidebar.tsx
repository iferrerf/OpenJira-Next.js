import { Box, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { useContext } from 'react';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Item1', 'Item2', 'Item3', 'Item4']

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);


    return (
        <Drawer
            anchor='left'
            open={sidemenuOpen}
            onClose={closeSideMenu}>

            <Box sx={{ width: 250 }}>

                <Box sx={{ padding: '15px', textAlign: 'center' }}>
                    <Typography variant='h4'>Menú</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton 
                            sx={{paddingLeft: 6 }}
                                key={text}>
                                <ListItemIcon >
                                    {index === 0 && <InboxOutlinedIcon />}
                                    {index === 1 && <FormatListBulletedRoundedIcon />}
                                    {index === 2 && <EmailOutlinedIcon />}
                                    {index === 3 && <AssignmentIndRoundedIcon />}
                                </ListItemIcon>

                                <ListItemText primary={text} />

                            </ListItemButton>
                        ))
                    }
                </List>

            </Box>

        </Drawer>
    )
};
