import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../utils/ImgUtils";

const OtpScreen = () => {
  const [otp, setOtp] = useState(""); // Entered OTP
  const [sentOtp, setSentOtp] = useState(""); // Generated OTP
  const [error, setError] = useState(""); // Error messages
  const [resendDisabled, setResendDisabled] = useState(false); // Timer control
  const [snackbarOpen, setSnackbarOpen] = useState(false); // OTP Snackbar control
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false); // Success message Snackbar
  const [timer, setTimer] = useState(0); // Resend button timer

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  const ResendOtp = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
  });

  // Automatically generate OTP when component loads
  useEffect(() => {
    const otp = generateOtp();
    handleSnackbarOpen(`OTP: ${otp}`);
  }, []);

  // Generate a random 6-digit OTP
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(randomOtp);
    return randomOtp;
  };

  const handleSnackbarOpen = (message) => {
      setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleResendOtp = () => {
    const otp = generateOtp();
    handleSnackbarOpen(`OTP: ${otp}`);
    setResendDisabled(true);
    setTimer(30);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleSubmit = () => {
    if (!otp) {
      setError("OTP is required.");
    } else if (otp !== sentOtp) {
      setError("Invalid OTP. Please try again.");
    } else {
      setError("");
      setSuccessSnackbarOpen(true);
      setTimeout(() => {
        navigate("/dashboardscreen");
      }, 2000);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" sx={{ backgroundImage: "url(/images/BackgroundImg.jpeg)" }}>
      <Box width="800px" bgcolor="#fff" boxShadow={3} borderRadius="8px">
        <Box flex={1} p={4.5}>
          <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
          <Typography variant="h5" mt={2}>Sign In</Typography>
          <Typography variant="body2" mb={2}>To access CN Books</Typography>
          <TextField fullWidth defaultValue={emailMobile} InputProps={{ readOnly: true }} />
          <TextField fullWidth value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" error={!!error} helperText={error} />
          <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 2 }}>Verify</Button>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <ResendOtp onClick={handleResendOtp} disabled={resendDisabled}>Resend OTP {resendDisabled && `(${timer}s)`}</ResendOtp>
          </Box>

          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleSnackbarClose} severity="info">{snackbarMessage}</Alert>
          </Snackbar>

          <Snackbar open={successSnackbarOpen} autoHideDuration={3000} onClose={handleSuccessSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleSuccessSnackbarClose} severity="success">Sign in was successfully completed!</Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default OtpScreen;
