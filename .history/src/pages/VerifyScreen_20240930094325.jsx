import React, { useState } from "react";
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
  const [otpInput, setOtpInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile, otp } = location.state || {}; // OTP passed from SignUp page

  const handleSubmit = () => {
    if (otpInput === otp.toString()) {
      setSnackbarMessage("OTP verified successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/signin"); // Navigate to sign-in page after successful OTP verification
      }, 2000);
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
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
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
