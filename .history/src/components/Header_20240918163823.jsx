import { AppBar, Avatar, Badge, Box, Button, Menu, MenuItem, Stack, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { images } from "../utils/ImgUtils";
import {   NotificationsOutlined,   } from "@mui/icons-material";
import { FaAngleDown } from "react-icons/fa";
const Header =() =>
{
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white", 
    flexWrap:"wrap"
  });
  const IconContainer = styled(Box)({
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    gap:"12px",
    marginRight:"8px"
    
  }) 
  const [open,SetOpen] = useState(false);
  const handleOpen = ()=>
  {
    SetOpen(true)
  }
  return (
    <>
      <Box>
        <Box flex={1}>
          <AppBar position="sticky">
            <StyledToolbar>
              <Typography variant="h6" color="black">New Customer</Typography>
              
              <IconContainer >
              <Badge badgeContent={4} color="error" sx={{display:{xs:"none",sm:"flex"}}}>
                <NotificationsOutlined fontSize="large" sx={{ fontSize:"30px", color:"#1E1E1E",backgroundColor:"#C7ECFF", borderRadius:"4px"}} />
              </Badge>
              <Box component={"span"} width={34}height={36} backgroundColor="#C7ECFF" borderRadius={"4px"}>
              <Avatar alt="Remy Sharp"  src={images.officemanImg} sx={{width:"33px", height:"33px"}}  />
              </Box>
              <Box sx={{display:"flex", gap:"5px"}}>
                <Box>
                <Typography variant="h6" sx={{color:"#1E1E1E",fontSize:"18px"}}>Rahul</Typography>
                <Typography variant="body2" sx={{color:"#1E1E1E"}}>Admin</Typography>
                </Box>
                
              <FaAngleDown onClick={handleOpen}   color=" rgba(0, 0, 0, 0.84)" fontSize={"27px"}/>
              </Box>
              
              {/* arrowdown icon */}
              <Menu
              sx={{position:"absolute",top:"56px"}}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
       
        open={open}
        onClose={e=>SetOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem ><Box sx={{display:"flex", alignContent:"center",marginRight:"5px"}}><img src={images.Customericon} alt="CustomerIcon" /> </Box>My Profile</MenuItem>
        <MenuItem ><Box sx={{display:"flex", alignContent:"center", marginRight:"10px"}}><img src={images.Addressicon}width={"25px"} alt="AddressIcon" /></Box> My Address</MenuItem>
        <MenuItem ><Box sx={{display:"flex", alignContent:"center", marginRight:"10px"}}><img src={images.Passwordicon}width={"25px"} alt="PasswordIcon" /></Box>Change Password</MenuItem>
        <MenuItem ><Box sx={{display:"flex", alignContent:"center", marginRight:"9px"}}><img src={images.Accounticon}width={"25px"} alt="AccountIcon" /></Box>Close Your Account</MenuItem>
        <MenuItem ><Box sx={{display:"flex", alignContent:"center", marginRight:"10px"}}><img src={images.Logouticon}width={"25px"} alt="LogoutIcon" /></Box>Logout</MenuItem>
      </Menu>
              </IconContainer>
            </StyledToolbar>
          </AppBar>
        </Box>
      </Box>
    </>
  );
};
export default Header