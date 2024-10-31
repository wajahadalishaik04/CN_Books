import styled from "@emotion/styled";
import { Add, ArrowDropDown, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography, TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import InvoiceTable from "../components/Tables/InvoiceTable";

const Invoice = () => {
  // custom styling components
  const StyledTextField = styled(<TextField
    id=""
    label=""
    value={}
    onChange={}
    
  />)({
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F3F3F3 ",

      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
      "&.Mui-focused": {
        backgroundColor: "#EBF9FF", // Focused background color
        borderColor: "#5BC4FA", // Focused border color
      },
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledButton = styled(Button)({
    textTransform: "none",
    borderRadius: "4px 0 0 4px",
    backgroundColor: "#6666FF",
    borderRight: "0.4px solid #dadada",
    fontSize: "1rem",
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef(null); // Reference for the scrollable container

  // Function to disable page scrolling
  const disablePageScroll = () => {
    document.body.style.overflow = "hidden"; // Disable window scroll
  };

  // Function to enable page scrolling (cleanup)
  const enablePageScroll = () => {
    document.body.style.overflow = ""; // Enable window scroll
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      if (currentScrollY > lastScrollY) {
        // Scrolling down: Hide the footer
        setFooterVisible(true);
      } else {
        // Scrolling up: Show the footer
        setFooterVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Disable page scrolling on mount
    disablePageScroll();

    return () => {
      // Cleanup event listener and enable page scrolling on unmount
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      enablePageScroll();
    };
  }, [lastScrollY]);

  return (
    <>
      <Box
        component={Paper}
        ref={containerRef}
        sx={{
          height: "calc(100vh - 57px)", // Set height to fit the viewport
          maxHeight: 620,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* All invoices  header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
            padding: "0 1rem",
          }}
        >
          <Typography variant="h6" fontSize={"1.50rem"} fontWeight={450}>
            All Invoices
          </Typography>

          <Box display="flex" gap={1} alignItems={"center"}>
            {/* Left Button (New) */}
            <Box display={"flex"}>
              <StyledButton
                component={Link}
                to="/newinvoice"
                variant="contained"
                startIcon={<Add />}
              >
                New
              </StyledButton>

              {/* Right Dropdown Button */}
              <IconButton
                onClick={handleClick}
                sx={{
                  backgroundColor: "#6666FF",
                  borderRadius: "0 4px 4px 0",

                  boxShadow:
                    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                  "&:hover": {
                    backgroundColor: "#6666FF",
                  },
                }}
              >
                <ArrowDropDown sx={{ color: "white" }} />
              </IconButton>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Option 1</MenuItem>
                <MenuItem onClick={handleClose}>Option 2</MenuItem>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                backgroundColor: "#F9FAFB",
                width: "24px",
                height: "22px",
                padding: 0.9,
                borderRadius: "4px",
                border: "1px solid #dadada",
              }}
            >
              <MoreVert
                sx={{ color: "black", width: "24px", height: "24px" }}
              />
            </Box>
          </Box>
        </Box>
        {/* payment summary */}
        <Box
          sx={{
            mt: 2,
            padding: 1.7,
            borderRadius: "4px",
            borderTop: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: "#F9FAFB",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 500, color: "#363626", fontSize: "0.9rem" }}
            >
              Payment Summary
            </Typography>
          </Box>
          <Box
            mt={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <Box mr={1} mt={0.5}>
                <BsArrowDownLeftCircleFill
                  id="arrowdown"
                  size={27.5}
                  color="#6666FF"
                />
              </Box>

              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400, color: "#000000" }}
                >
                  Total OutStanding Receivables
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, fontSize: "0.8rem" }}
                >
                  ₹1,02,265.88
                </Typography>
              </Box>
            </Box>

            {/* Due today */}
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, color: "#000000", fontSize: "0.8rem" }}
              >
                Due Today
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, fontSize: "0.8rem" }}
              >
                ₹0.00
              </Typography>
            </Box>
            {/* Due with in 30day */}
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, color: "#000000", fontSize: "0.8rem" }}
              >
                Due With In 30 Days
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, fontSize: "0.8rem" }}
              >
                ₹0.00
              </Typography>
            </Box>
            {/* Overdue Invoice */}
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, color: "#000000", fontSize: "0.8rem" }}
              >
                Overdue Invoice
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, fontSize: "0.8rem" }}
              >
                ₹1,02,265.88
              </Typography>
            </Box>
            {/* Average Number of Days For  Getting Paid */}
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 400, color: "#000000", fontSize: "0.8rem" }}
              >
                Average No. of Days For Getting Paid
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, fontSize: "0.8rem" }}
              >
                135 Days
              </Typography>
            </Box>
          </Box>{" "}
          {/*  */}
        </Box>

        <Box mt={2}>
          <InvoiceTable />
        </Box>
      </Box>
    </>
  );
};

export default Invoice;
