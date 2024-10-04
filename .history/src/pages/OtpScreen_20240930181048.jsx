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
  const [sentOtp, setSentOtp] = useState(""); // Store generated OTP
  const [error, setError] = useState(""); // Store error messages
  const [resendDisabled, setResendDisabled] = useState(false); // Timer control for Resend OTP button
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar control
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false); // Success Snackbar
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

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
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
    if (!otp) {
      setError("OTP is required."); // Show error if no OTP is entered
    } else if (otp !== sentOtp) {
      setError("Invalid OTP. Please try again.");
    } else {
      setError(""); // Clear error on successful OTP
      setSuccessSnackbarOpen(true); // Show success message
      setTimeout(() => {
        navigate("/dashboardscreen"); // Navigate to the next screen after success
      }, 2000); // Delay navigation to show the success message
    }
  };

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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src={images.codersnestLogo}
                alt="Logo"
                style={{ width: 200 }}
              />
            </Box>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Sign In
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              To access CN Books
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
              error={!!error} // Show error if there is any
              helperText={error}
            />

            {/* Resend OTP button with timer */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <ResendOtp onClick={handleResendOtp} disabled={resendDisabled}>
                Resend OTP {resendDisabled && `(${timer}s)`}
              </ResendOtp>
            </Box>

            {/* Verify Button */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#5BC4FA",
                mt: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Verify
            </Button>
            <Typography variant="body2" color="#000000" mt={2}>
              Or login with
            </Typography>
            {/* Social Icons */}
            <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
              <img src={images.googleicon} width={24} alt="googleicon" />
              <img src={images.facebookicon} width={24} alt="facebookicon" />
              <img src={images.linkedinicon} width={24} alt="linkedinicon" />
              <img src={images.xicon} width={24} alt="xicon" />
              <img src={images.appleicon} width={24} alt="appleicon" />
              <img src={images.windowsicon} width={24} alt="windowsicon" />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 400 }} mt={2}>
              Don’t have a CN books Account?{" "}
              <Link
                to={"/signup"}
                style={{
                  color: "#5BC4FA",
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                Sign Up Now
              </Link>
            </Typography>

            {/* Snackbar for OTP display */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity="info"
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>

            {/* Success Snackbar for OTP verification */}
            <Snackbar
              open={successSnackbarOpen}
              autoHideDuration={3000}
              onClose={handleSuccessSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleSuccessSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Sign in was successfully completed!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        <Box sx={{ borderRight: "1.5px solid #EFEFEF" }}></Box>

        {/* Right Side - Illustration Image */}
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
            width="100%"
            height="100%"
            objectFit
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OtpScreen;
