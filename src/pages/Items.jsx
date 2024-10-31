import styled from "@emotion/styled";
import { Add, KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ItemsTable from "../components/Tables/ItemsTable";
import { Link } from "react-router-dom";

const Items = () => {
  const StyledButton = styled(Button)({
    textTransform: "none",
    borderRadius: "5px solid #dadada",
    backgroundColor: "#6666FF",

    fontSize: "0.95rem",
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
        {/* Items header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontSize={"1.5rem"}>
            {" "}
            All Items
            <KeyboardArrowDown
              sx={{
                position: "relative",
                top: 5,
                color: "#6666FF",
                width: 22,
                height: 22,
              }}
            />
          </Typography>
          <Box display={"flex"} gap={1.5}>
            <StyledButton
              variant="contained"
              component={Link}
              to="/newItems"
              startIcon={<Add />}
            >
              New
            </StyledButton>
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
        {/* Items Table */}
        <ItemsTable />
      </Box>
    </>
  );
};

export default Items;
