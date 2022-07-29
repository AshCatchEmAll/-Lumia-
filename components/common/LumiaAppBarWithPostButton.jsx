import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Search from "@mui/icons-material/Search";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import logo from "../../assets/logo.svg";
import { ArrowBackIos, Cancel,  } from "@mui/icons-material";
import { useRouter } from "next/router";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LumiaAppBarWithPostButton = ({onBackClick,onPostClick,postText="Post"}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:"#222845"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box  sx={{
            
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}>
                 <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onBackClick}
              color="inherit"
            >
              <Cancel />
            </IconButton>
         
          </Box>
         

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onBackClick}
              color="inherit"
            >
              <Cancel />
            </IconButton>
           
          </Box>
          <Box
             sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
              
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button variant="contained" sx={{backgroundColor:"#EEBBC3",color:"#222845 "}} onClick={async()=>{
                await onPostClick();
                router.back();
              }}>{postText}</Button>
            </Tooltip>
            
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default LumiaAppBarWithPostButton;
