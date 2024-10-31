import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../utils/ImgUtils";
import styled from "@emotion/styled";
import { AddCircle, ArrowDropDown, HelpOutline } from "@mui/icons-material";
import CashFlowGraph from "../components/CashFlowGraph";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ProjectWatchlist from "../components/ProjectWatchlist";
import BankAndCreditCard from "../components/BankAndCreditCard";
import AccountWatchlist from "../components/AccountWatchlist";
import { Link } from "react-router-dom";

const Home = () => {
  // menu Tabs section
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  // footer section
  const [isFooterVisible, setFooterVisible] = useState(true); // To control footer visibility
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
        <Box sx={{ display: "flex", p: 2 }}>
          <Box>
            <img src={images.CN_Logo_Mark} alt="" width={56} height={56} />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", mt: 1.2, ml: 1 }}
          >
            <Typography fontWeight={500}>HELLO, CODERS NEST</Typography>
            <Typography fontSize={"0.8rem"} color="#999999">
              CODERSNEST PRIVATE LIMITED
            </Typography>
          </Box>
        </Box>
        <Tabs
          sx={{ borderBottom: "3px solid #EFEFEF", textTransform: "none" }}
          value={tabsValue}
          onChange={handleTabChange}
        >
          <Tab
  sx={{
    textTransform: "none",
    color: "#6666FF", // default color
    "&:focus": {
      color: "#6666FF", // color on focus
    },
    "&.Mui-selected": {
      color: "#6666FF", // color when tab is selected
    },
    
  }}
  label="Dashboard"
/>

          <Tab
            sx={{
              "& .MuiButtonBase-root ": {
                "&:hover": {
                  color: "#6666FF",
                },
              },
              textTransform: "none",
            }}
            label="Getting Started"
          />
          <Tab sx={{ textTransform: "none" }} label="Announcements" />
          <Tab sx={{ textTransform: "none" }} label="Recent Updates" />
        </Tabs>
        {tabsValue === 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                padding: 3.3,
              }}
            >
              {/* Total Receivables */}
              <Card sx={{ width: "45%", borderRadius: "8px" }}>
                <CardContent
                  sx={{
                    "&.MuiCardContent-root": {
                      padding: 0,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#F9FAFB",
                      borderBottom: "1.5px solid #EFEFEF ",
                      padding: 1,
                    }}
                  >
                    <Typography variant="h6">
                      Total Receivables
                      <HelpOutline
                        sx={{
                          position: "relative",
                          top: 3,
                          left: 2,
                          width: 18,
                          height: 18,
                          color: "#ccc",
                        }}
                      />
                    </Typography>
                    <Button
                      sx={{ textTransform: "none", color: "#6666FF" }}
                      variant="text"
                    >
                      <AddCircle sx={{ width: 19, height: 19, mr: 0.3 }} />
                      New
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      padding: 2,
                      borderBottom: "1.5px solid #EFEFEF",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Total Unpaid Invoices ₹88,500.00
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={70}
                      sx={{
                        height: 7,
                        marginTop: 1,
                        backgroundColor: "#f5f5f5",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#ffbb33",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                      padding: 2.1,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="#6666FF">
                        CURRENT
                      </Typography>
                      <Typography variant="h6">₹0.00</Typography>
                    </Box>
                    <Box
                      sx={{ borderRight: "1.5px solid #EFEFEF", ml: 9, mr: 4 }}
                    ></Box>
                    <Box paddingRight={13}>
                      <Typography variant="body2" color="error">
                        OVERDUE
                      </Typography>
                      <Typography variant="h6">
                        ₹88,500.00
                        <ArrowDropDown sx={{ position: "relative", top: 6 }} />
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Total Payables */}
              <Card sx={{ width: "45%", borderRadius: "8px" }}>
                <CardContent
                  sx={{
                    "&.MuiCardContent-root": {
                      padding: 0,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#F9FAFB",
                      borderBottom: "1.5px solid #EFEFEF ",
                      padding: 1,
                    }}
                  >
                    <Typography variant="h6">
                      Total Payables
                      <HelpOutline
                        sx={{
                          position: "relative",
                          top: 3,
                          left: 2,
                          width: 18,
                          height: 18,
                          color: "#ccc",
                        }}
                      />
                    </Typography>
                    <Button
                      sx={{ textTransform: "none", color: "#6666FF" }}
                      variant="text"
                    >
                      <AddCircle sx={{ width: 19, height: 19, mr: 0.3 }} />
                      New
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      padding: 2,
                      borderBottom: "1.5px solid #EFEFEF",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Total Unpaid Invoices ₹0.00
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={0}
                      sx={{
                        height: 7,
                        marginTop: 1,
                        backgroundColor: "#f5f5f5",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#ffbb33",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                      padding: 2.1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="#6666FF">
                        CURRENT
                      </Typography>
                      <Typography variant="h6">₹0.00</Typography>
                    </Box>
                    <Box
                      sx={{ borderRight: "1.5px solid #EFEFEF", ml: 12 }}
                    ></Box>
                    <Box paddingRight={18}>
                      <Typography variant="body2" color="error">
                        OVERDUE
                      </Typography>
                      <Typography variant="h6">
                        ₹0.00
                        <ArrowDropDown sx={{ position: "relative", top: 6 }} />
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            {/* Cash flow Graph */}
            <Box padding={3.3}>
              <CashFlowGraph />
            </Box>
            <Box>
              <IncomeExpenseChart />
            </Box>
            {/*  */}
            <Box padding={2} display={"flex"} justifyContent={"space-between"}>
              <ProjectWatchlist />
              <BankAndCreditCard />
            </Box>
            <Box padding={2}>
              <AccountWatchlist />
            </Box>
            {/* Footer Sections */}

            <Box
              sx={{
                backgroundColor: "#F9F9F9",
                padding: "20px 40px",
                mt: 2,
                borderTop: "1.5px solid #EFEFEF",
              }}
            >
              {/* Top Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {/* Left Section */}
                <Box sx={{ flex: "1 1 300px" }}>
                  <Typography variant="h6" gutterBottom>
                    Account on the go!
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Download the CN Books app for Android and iOS to manage your
                    finances from anywhere, anytime!
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={images.codersnest} // Replace with actual image path
                      alt="Mobile App"
                      style={{ width: "80px", marginRight: "20px" }}
                    />
                    <Box>
                      <img
                        src="path_to_qr_code_image" // Replace with actual QR code image path
                        alt="QR Code"
                        style={{ width: "80px" }}
                      />
                      <Link
                        href="#"
                        variant="body2"
                        sx={{
                          display: "block",
                          marginTop: "10px",
                          color: "#007BFF",
                        }}
                      >
                        Learn More →
                      </Link>
                    </Box>
                  </Box>
                </Box>

                {/* Help & Support Section */}
                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="h6" gutterBottom>
                    Help & Support
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Contact Support
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Knowledge Base
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Help Documentation
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Webinar
                  </Typography>
                </Box>

                {/* Quick Links Section */}
                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Links
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Getting Started
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Mobile Apps
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Add-ons
                  </Typography>
                  <Typography variant="body2" paragraph>
                    What's New?
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Developers API
                  </Typography>
                </Box>
              </Box>

              {/* Bottom Section */}
              <Box
                sx={{
                  marginTop: "40px",
                  textAlign: "center",
                  borderTop: "1px solid #e0e0e0",
                  paddingTop: "10px",
                  color: "#757575",
                }}
              >
                <Typography variant="body2">
                  © 2023, CN Books Pvt. Ltd. All Rights Reserved.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
