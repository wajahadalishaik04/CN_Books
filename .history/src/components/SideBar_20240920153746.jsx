import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import { images } from "../utils/ImgUtils";

const SideBar = () => {
  const StyledListItemButton = styled(ListItemButton)({
    "&:hover .MuiListItemIcon-root": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#5BC4FA",
      color: "#fff",
      borderRadius: 8,
    },
    //dashboard white icon
    "&:hover .dashboardicon": {
      content: `url(${images.dashboardwhiteicon})`,
    },
    //customer group white icon
    "&:hover .groupcustomericon": {
      content: `url(${images.groupcustomerwhiteicon})`,
    },
    //category white icon
    "&:hover .categoryicon": {
      content: `url(${images.categorywhiteicon})`,
    },
  });

  return (
    <>
    <B
      <Box
        flex={1}
        sx={{
          width: "100%",
          maxWidth: 200,
          borderRight: "2.0px solid #EFEFEF",
          height: "100vh",
        }}
      >
        <Box>
        <Box flex={1} mt={2.5} >
              <img src={images.codersnestLogo} width={180} alt="" />

              </Box>
          <List>
            <ListItem disablePadding sx={{ padding: 1 }}>
              <StyledListItemButton component={Link} to="/dashboardscreen">
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <img
                    src={images.dashboardicon}
                    alt="Dashboard Icon"
                    className="dashboardicon"
                    style={{ width: "27px", height: "27px" }}
                  />
                  <ListItemText maxWidth={130} primary="Dashboard" />
                </Box>
              </StyledListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ padding: 1 }}>
              <StyledListItemButton component={Link} to="/customer">
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <img
                    src={images.groupcustomericon}
                    alt="Group Customer Icon"
                    className="groupcustomericon"
                    style={{ width: "27px", height: "27px" }}
                  />
                  <ListItemText maxWidth={130} primary="Customer" />
                </Box>
              </StyledListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ padding: 1 }}>
              <StyledListItemButton component={Link} to="/category">
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <img
                    src={images.categoryicon}
                    alt="category icon"
                    className="categoryicon"
                    style={{ width: "27px", height: "27px" }}
                  />
                  <ListItemText maxWidth={130} primary="Category" />
                </Box>
              </StyledListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
