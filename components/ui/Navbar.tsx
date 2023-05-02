import { useContext } from "react";
import { UIContext } from "@/context/ui";
import NextLink from "next/link";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';



export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='primary'
          onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink
          href='/'
          passHref
          style={{
            display: 'flex',
            color: 'white',
          }}
          >
          <Typography variant='h5'>OpenJira</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
