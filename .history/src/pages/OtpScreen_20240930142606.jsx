import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { useLocation, useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const [otp, setOtp] = useState(""); // Store entered OTP
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP
  const [error, setError] = useState(""); // Store error messages
  const [resendDisabled, setResendDisabled] = useState(false); // Timer control for Resend OTP button
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar control
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  // Styled Resend Button
  const ResendOtp = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
  });

  // Function to generate a random OTP
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    return randomOtp;
  };

  // Function to show snackbar
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to send OTP (called on "Sent" button click)
  const sendOtp = () => {
    const otp = generateOtp(); // Generate OTP
    handleSnackbarOpen(`OTP: ${otp}`); // Show OTP in snackbar
  };

  // Resend OTP with 30-second timer
  const handleResendOtp = () => {
    sendOtp();
    setResendDisabled(true);
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000); // Disable resend for 30 seconds
  };

  // Handle OTP submission and verification
  const handleSubmit = () => {
    if (otp === generatedOtp) {
      navigate("/dashboardscreen"); // Navigate to the next screen
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Handle OTP input change and enable Verify button when OTP is filled
  const isOtpFilled = otp.length === 6; // Assume OTP length is 6

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      sx={{ backgroundImage: "url(/images/BackgroundImg.jpeg)" }}
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
        <Box flex={1} p={4.5} mt={1} component={"form"}>
          <Box flex={1} sx={{ width: "330px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <img src={images.codersnestLogo} alt="Logo" style={{ width
