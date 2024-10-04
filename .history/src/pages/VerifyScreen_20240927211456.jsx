import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const VerifyScreen = () => {
  const [isResendDisabled, setIsResendDisabled] = useState(false); // To disable and hide the Resend button
  const [timer, setTimer] = useState(0); // Timer state

  const StyledButton = styled(Button)({
    fontSize:"1rem",
    textTransform:'none'
  });

  const navigate = useNavigate();
  const location = useLocation(); 
  const { emailMobile } = location.state || {}; 

  // Handle the OTP resend and start the countdown
  const handleResendOTP = () => {
    setIsResendDisabled(true);  // Hide the Resend button
    setTimer(30);               // Start countdown from 30 seconds
    const randomOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random OTP
    alert(`Your OTP is: ${randomOTP}`);  // Display the random OTP
  };

  // Effect to handle the countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isResendDisabled) {
      setIsResendDisabled(false); // Show the Resend button again after the timer finishes
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timer, isResendDisabled]);

  const handleSubmit = () => {
    navigate("/signin");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      sx={{
        backgroundImage: "url(/images/BackgroundImg.jpeg)",
      }}
    >
      <Box
        display="flex"
        bgcolor="#fff"
        boxShadow={3}
        marginTop={2}
        borderRadius="8px"
        overflow="hidden"
        width="800px"
        height="500px"
      >
        <Box flex={1} p={6} mt={1}>
          <Box flex={1} width={"330px"}>
            <Box
              display="flex"
              component={"form"}
              justifyContent="space-between"
              alignItems="center"
              sx={{ position: "relative", right: "7px" }}
            >
              <img
                src={images.codersnestLogo}
                alt="Logo"
                style={{ width: 200 }}
              />
            </Box>
            <Typography variant="h5" fontWeight={500} mt={2} mb={1}>
              Sign up to access CN Books
            </Typography>
            <Typography varient="body2" mb={1} fontWeight={450}>
              Verify your Sign Up
            </Typography>
            <Typography>
              Enter the OTP sent to your mobile number or email.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="span">
                {emailMobile}
              </Typography>
              <StyledButton onClick={() => navigate("/signup")} variant="text">
                Change
              </StyledButton>
            </Box>
            <TextField
              size="small"
              type="password"
              placeholder="Enter OTP"
              sx={{
                width: "100%",
                fontWeight: "500",
                backgroundColor: "#F3F3F3",
                "&:hover": {
                  backgroundColor: "#FFF",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    backgroundColor: "#EBF9FF", 
                    borderColor: "#5BC4FA", 
                  },
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
              {isResendDisabled ? (
                <Typography variant="body2" color="textSecondary">
                  Resend OTP in {timer}s
                </Typography>
              ) : (
                <StyledButton onClick={handleResendOTP} variant="text">
                  Resend OTP
                </StyledButton>
              )}
            </Box>

            <StyledButton
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#5BC4FA", mt: 1 }}
            >
              Verify
            </StyledButton>
          </Box>
        </Box>
        <Box
          sx={{ borderRight: "1.5px solid #EFEFEF" }}
        ></Box>

        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <img
            src={images.otpImg}
            alt="Illustration"
            width="360px"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyScreen;
