import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  styled,
  IconButton,
  Drawer,
  Badge,
  Paper,
  MenuItem,
  Menu,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { images } from "../utils/ImgUtils";
import {
  AccountBalance,
  AddCircleOutlined,
  Description,
  MenuRounded,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";

const SideBar = () => {
  const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      right: 0,
      top: 0,
      width: "22px",
      height: "21px",
      border: "1.5px solid #eee ",
      borderRadius: "8px",
      padding: "4px",
      color: "white",
      backgroundColor: "#6666FF",
    },
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    "&:hover .MuiListItemIcon-root": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#6666FF",
      color: "#fff",
      borderRadius: 8,
    },
    "&:hover .dashboardicon": {
      content: `url(${images.dashboardwhiteicon})`,
    },
    "&:hover .groupcustomericon": {
      content: `url(${images.groupcustomerwhiteicon})`,
    },
    "&:hover .employeemanagementicon": {
      content: `url(${images.groupcustomerwhiteicon})`,
    },
    "&:hover .categoryicon": {
      content: `url(${images.categorywhiteicon})`,
    },
  }));

  // Sidebar content with condition for mobile view
  const sidebarContent = (
    <Box
      component={Paper}
      sx={{
        width: isMobile ? 200 : 200,
        borderRight: "3px solid #EFEFEF",
      }}
    >
      <Box mt={2.5} display="flex" ml={2}>
        <img
          src={images.CN_Horizontal}
          width={isMobile ? 140 : 155}
          alt="Coders Nest Logo"
        />
      </Box>

      <List>
        {/* Home List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/home">
            <Box
              sx={{
                display: "flex",
                gap: 7.5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <img
                  src={images.dashboardicon}
                  alt="Home Icon"
                  className="dashboardicon"
                  style={{ width: "24px", height: "24px" }}
                />
                {(!isMobile || open) && <ListItemText primary="Home" />}
              </Box>
              <IconButton>
                <StyledBadge badgeContent={3} />
              </IconButton>
            </Box>
          </StyledListItemButton>
        </ListItem>

        {/* Items List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/items">
            <Box
              sx={{
                display: "flex",
                gap: 7.5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <RiShoppingBag4Fill size={24} />
                {(!isMobile || open) && <ListItemText primary="Items" />}
              </Box>

              <AddCircleOutlined sx={{ width: 20, height: 20 }} />
            </Box>
          </StyledListItemButton>
        </ListItem>
        {/* Banking List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/banking">
            <Box
              sx={{
                display: "flex",
                gap: 5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <AccountBalance />
                {(!isMobile || open) && <ListItemText primary="Banking" />}
              </Box>
            </Box>
          </StyledListItemButton>
        </ListItem>
        {/* Customer List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/customer">
            <Box
              sx={{
                display: "flex",
                gap: 7.5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <img
                  src={images.groupcustomericon}
                  alt="Customer Icon"
                  className="groupcustomericon"
                  style={{ width: "24px", height: "24px" }}
                />
                {(!isMobile || open) && <ListItemText primary="Customer" />}
              </Box>
            </Box>
          </StyledListItemButton>
        </ListItem>
        {/* Category List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/category">
            <Box
              sx={{
                display: "flex",
                gap: 7.5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <img
                  src={images.categoryicon}
                  alt="Category Icon"
                  className="categoryicon"
                  style={{ width: "24px", height: "24px" }}
                />
                {(!isMobile || open) && <ListItemText primary="Category" />}
              </Box>
            </Box>
          </StyledListItemButton>
        </ListItem>
        {/* Employee Management with Dropdown */}

        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton onClick={handleDropdownClick}>
            <Box
              sx={{
                display: "flex",
                gap: 5.1,
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <img
                  src={images.groupcustomericon}
                  alt="EmployeeManagementicon"
                  className="employeemanagementicon"
                  style={{ width: "24px", height: "24px" }}
                />
                {(!isMobile || open) && (
                  <ListItemText primary="Employee Management" />
                )}
                {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </Box>
          </StyledListItemButton>
        </ListItem>

        {/* Dropdown Items */}
        <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding sx={{ paddingLeft: 4 }}>
              <StyledListItemButton component={Link} to="/employee">
                <ListItemText primary="Employee" />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ paddingLeft: 4 }}>
              <StyledListItemButton component={Link} to="/timesheet">
                <ListItemText primary="Time Sheet" />
              </StyledListItemButton>
            </ListItem>
          </List>
        </Collapse>
        {/* Invoice List */}
        <ListItem disablePadding sx={{ padding: 1 }}>
          <StyledListItemButton component={Link} to="/invoice">
            <Box
              sx={{
                display: "flex",
                gap: 7.5,
                alignItems: "center",
                justifyContent: isMobile && !open ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <Description />
                {(!isMobile || open) && <ListItemText primary="Invoice" />}
              </Box>
            </Box>
          </StyledListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box
            sx={{
              position: "relative",
              top: 9,
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
          <IconButton onClick={toggleSidebar}>
            <MenuRounded />
          </IconButton>
          </Box>
          <Drawer anchor="left" open={open} onClose={toggleSidebar}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
    </>
  );
};

export default SideBar;
