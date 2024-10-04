import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyScreen = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  useEffect(() => {
    // Generate a random 6-digit OTP
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(randomOTP);
    setSnackbarMessage(`Your OTP is: ${randomOTP}`);
    setSnackbarSeverity("info");
    setSnackbarOpen(true); // Show OTP alert on page load
  }, []);

  const handleSubmit = () => {
    if (otp === generatedOtp.toString()) {
      setSnackbarMessage("Sign up successfully completed!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // Delay navigation to show success message
    } else {
      setSnackbarMessage("Invalid OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Box
        display="flex"
        bgcolor="#fff"
        boxShadow={3}
        p={6}
        borderRadius="8px"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h6" mb={2}>
          OTP Verification
        </Typography>
        <Typography mb={2}>
          Please enter the OTP sent to {emailMobile}
        </Typography>
        <TextField
          size="small"
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: "#F3F3F3" }}
        />
        <Button onClick={handleSubmit} variant="contained" fullWidth>
          Verify OTP
        </Button>
      </Box>

      {/* Snackbar for OTP and messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerifyScreen;
