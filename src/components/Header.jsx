import { AppBar, Avatar, Badge, Box, Menu, MenuItem, Stack, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { images } from "../utils/ImgUtils";
import { NotificationsOutlined } from "@mui/icons-material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Header = () => {
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    flexWrap: "wrap",
  });

  const IconContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    marginRight: "8px",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true); // Show dropdown
  };

  const handleClose = () => {
    setOpen(false); // Hide dropdown
  };

  return (
    <>
      <Box>
        <Box flex={1}>
          <AppBar position="sticky">
            <StyledToolbar>
              <IconContainer>
                <Badge badgeContent={4} color="error" sx={{ display: { xs: "none", sm: "flex", right:1.1 } }}>
                  <NotificationsOutlined fontSize="large" sx={{ fontSize: "27.4px", color: "#2e2e2e",position:"relative",top:1, }} />
                </Badge>
                
                <Box sx={{ display: "flex", gap: "5px",alignItems:"center" }}>
                <Box component={"span"} width={32} height={34} border={"1.1px solid #6666FF"}backgroundColor="#9c9cff  " borderRadius={"28px"}>
                  <Avatar alt="Remy Sharp" src={images.officemanImg} sx={{ width: "29px", height: "29px",top:2,left:1 }} />
                </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#1E1E1E", fontSize: "1rem" }}>Rahul</Typography>
                    <Typography variant="body2" sx={{ color: "#1E1E1E",fontSize:"0.800rem" }}>Admin</Typography>
                  </Box>
                  
                  {/* Conditional Rendering of Arrows */}
                  {!open ? (
                    <FaAngleDown onClick={handleOpen} color="rgba(0, 0, 0, 0.84)" fontSize={"27px"} />
                  ) : (
                    <FaAngleUp onClick={handleClose} color="rgba(0, 0, 0, 0.84)" fontSize={"27px"} />
                  )}
                </Box>

                {/* Dropdown Menu */}
                <Menu
                  sx={{ position: "absolute", top: "48.334px",}}
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem >
                    <Box sx={{ display: "flex", alignContent: "center", marginRight: "5px" }}>
                      <img src={images.Customericon} alt="CustomerIcon" />
                    </Box>
                    My Profile
                  </MenuItem>
                  <MenuItem>
                    <Box sx={{ display: "flex", alignContent: "center", marginRight: "10px" }}>
                      <img src={images.Addressicon} width={"25px"} alt="AddressIcon" />
                    </Box>
                    My Address
                  </MenuItem>
                  <MenuItem>
                    <Box sx={{ display: "flex", alignContent: "center", marginRight: "10px" }}>
                      <img src={images.Passwordicon} width={"25px"} alt="PasswordIcon" />
                    </Box>
                    Change Password
                  </MenuItem>
                  <MenuItem>
                    <Box sx={{ display: "flex", alignContent: "center", marginRight: "9px" }}>
                      <img src={images.Accounticon} width={"25px"} alt="AccountIcon" />
                    </Box>
                    Close Your Account
                  </MenuItem>
                  <MenuItem>
                    <Box sx={{ display: "flex", alignContent: "center", marginRight: "10px" }}>
                      <img src={images.Logouticon} width={"25px"} alt="LogoutIcon" />
                    </Box>
                    Logout
                  </MenuItem>
                </Menu>
              </IconContainer>
            </StyledToolbar>
          </AppBar>
        </Box>
      </Box>
    </>
  );
};

export default Header;
