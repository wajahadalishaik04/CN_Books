import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Banking = () => {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
          }}
        >
          <IconButton>
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
            padding: 2,
            textAlign: "center",
          }}
        >
          {/* Title */}
          <Typography variant="h6" gutterBottom>
            Stay on top of your money
          </Typography>

          {/* Subtitle */}
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Connect your bank and credit cards to fetch all your transactions.
            Create,<br></br>
            categorize and match these transactions to those you have in CN
            Books.
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6666FF",
                borderRight: "0.4px solid #dadada",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Connect Bank / Credit Card
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/addmanually"
              sx={{
                backgroundColor: "#F3F3F3",
                color: "black",
                textTransform: "none",
                borderColor: "#A7A7A7",
              }}
            >
              Add Manually
            </Button>
          </Stack>

          {/* Skip Link */}
          <Typography mt={2} variant="body2" color="textSecondary">
            Don't use banking for your business?{" "}
            <Link to={"#"} style={{ color: "#6666FF", textDecoration: "none" }}>
              Skip
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Banking;
