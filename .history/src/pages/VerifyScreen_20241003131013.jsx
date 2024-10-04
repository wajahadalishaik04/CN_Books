import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyScreen = () => {
  const [isResendDisabled, setIsResendDisabled] = useState(false); // To disable and hide the Resend button
  const [timer, setTimer] = useState(0); // Timer state
  const [otp, setOtp] = useState(""); // State for storing the OTP input
  const [generatedOtp, setGeneratedOtp] = useState(""); // State for storing the generated OTP
  const [error, setError] = useState(false); // State for OTP input error
  const [helperText, setHelperText] = useState(""); // State for helper text under the input field
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true); // Disable "Verify" button initially

  const StyledButton = styled(Button)({
    fontSize: "1rem",
    textTransform: "none",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  // Automatically generate OTP on component mount
  useEffect(() => {
    generateOtp();
  }, []);

  // Handle the OTP resend and start the countdown
  const handleResendOTP = () => {
    setIsResendDisabled(true); // Hide the Resend button
    setTimer(30); // Start countdown from 30 seconds
    generateOtp(); // Generate a new OTP
  };

  // Generate a new OTP and show it in the alert
  const generateOtp = () => {
    const randomOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random OTP
    setGeneratedOtp(randomOTP); // Save the generated OTP
    alert(`Your OTP is: ${randomOTP}`); // Show the OTP in an alert (for demo purposes)
  };

  // Effect to handle the countdown for the Resend button
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

  // Handle OTP form submission
  const handleSubmit = () => {
    if (!otp) {
      setError(true);
      setHelperText("Please enter the OTP.");
      return; // Prevent submission if OTP is not entered
    }

    if (otp === generatedOtp.toString()) {
      setError(false);
      setHelperText(""); // Clear any previous error message
      navigate("/signin"); // Navigate to the sign-in page after successful signup
    } else {
      setError(true); // Show the error state
      setHelperText("Invalid OTP. Please try again.");
    }
  };

  // Enable the "Verify" button when OTP is filled
  useEffect(() => {
    if (otp.length === 6) {
      setIsVerifyDisabled(false); // Enable "Verify" button when OTP length is 6
    } else {
      setIsVerifyDisabled(true); // Disable "Verify" button if OTP length is not 6
    }
  }, [otp]);

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
                src="/images/codersnestLogo.png"
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
              <Typography variant="span">{emailMobile}</Typography>
              <StyledButton onClick={() => navigate("/signup")} variant="text">
                Change
              </StyledButton>
            </Box>

            <TextField
              size="small"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // Update OTP state as the user types
              placeholder="Enter OTP"
              error={error} // Display error state if OTP is invalid
              helperText={helperText} // Show the error message below the input
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

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
              disabled={isVerifyDisabled} // Disable the Verify button until OTP is entered
            >
              Verify
            </StyledButton>
          </Box>
        </Box>
        <Box sx={{ borderRight: "1.5px solid #EFEFEF" }}></Box>

        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <img
            src="/images/otpImg.png"
            alt="Illustration"
            width="98%"
            height="93%"
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyScreen;