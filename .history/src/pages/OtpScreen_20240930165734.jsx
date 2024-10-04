import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  styled,
  InputAdornment,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { useLocation, useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const [otp, setOtp] = useState(""); // Store entered OTP
  const [sentOtp, setSentOtp] = useState(""); // Store generated OTP
  const [error, setError] = useState(""); // Store error messages
  const [resendDisabled, setResendDisabled] = useState(false); // Timer control for Resend OTP button
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar control
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [timer, setTimer] = useState(0); // Timer state for Resend button

  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  // Styled Resend Button
  const ResendOtp = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
  });

  // Function to generate OTP
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setSentOtp(randomOtp); // Store the OTP
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
    const otp = generateOtp(); // Generate OTP locally
    handleSnackbarOpen(`OTP: ${otp}`); // Show OTP in snackbar
  };

  // Resend OTP with 30-second timer
  const handleResendOtp = () => {
    sendOtp(); // Generate and display the OTP
    setResendDisabled(true);
    setTimer(30); // Set the countdown timer to 30 seconds
  };

  // Timer countdown for the Resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendDisabled(false); // Enable the Resend button after timer ends
    }
  }, [timer]);

  // Handle OTP submission and verification
  const handleSubmit = () => {
    if (otp === sentOtp) {
      navigate("/dashboardscreen"); // Navigate to the next screen
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Check if the OTP input is filled (6 characters long)
  const isOtpFilled = otp.length === 6;

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
        {/* Left Side - OTP Form */}
        <Box flex={1} p={4.5} mt={1} component={"form"}>
          <Box flex={1} sx={{ width: "330px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
            </Box>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Enter OTP
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              sent to your email/mobile
            </Typography>

            <TextField
              sx={{ marginBottom: 1.4 }}
              size="small"
              fullWidth
              defaultValue={emailMobile}
              InputProps={{ readOnly: true }} // Read-only input for email/mobile
            />

            <TextField
              size="small"
              type="text"
              placeholder="Enter OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledButton  onClick={() => resendOtp()} variant="text">Sent</StyledButton>
                  </InputAdornment>)
              }}
              sx={{
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
            {error && <Typography color="red">{error}</Typography>}

            {/* Resend OTP button with timer */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <ResendOtp onClick={handleResendOtp} disabled={resendDisabled}>
                Resend OTP {resendDisabled && `(${timer}s)`}
              </ResendOtp>
            </Box>

            {/* Verify Button, enabled only when OTP is filled */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: isOtpFilled ? "#5BC4FA" : "#E0E0E0",
                mt: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
              disabled={!isOtpFilled} // Disable button until OTP is filled
            >
              Verify
            </Button>

            {/* Snackbar for OTP display */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%" }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>

        {/* Right Side - Illustration Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <img src={images.otpImg} alt="Illustration" width="100%" height="100%" objectFit = "cover" />
        </Box>
      </Box>
    </Box>
  );
};

export default OtpScreen;
