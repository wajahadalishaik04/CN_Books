import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { Box, Paper, styled  } from '@mui/material'
import Table from '../components/Tables/CustomerTable'
import { Link } from 'react-router-dom'
const Customer = () => {
  const StyledButton = styled(Button)({
    color:'white',
    backgroundColor:"#6666FF",
    fontSize:"0.95rem",
    textTransform:"none"
  })
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
   <Box marginTop={2} component={Paper}
        ref={containerRef}
        sx={{
          height: "calc(100vh - 57px)", // Set height to fit the viewport
          maxHeight: 620,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }} >
   <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center", paddingRight:"1.5rem"}}>
   <StyledButton variant="contained"component={Link} to={"/newcustomer"} >
     New
   </StyledButton>
   </Box>
   <Table/>
   </Box>
   </>
  )
}

export default Customer