import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, styled, Snackbar, Alert } from "@mui/material";
import { images } from "../utils/ImgUtils";
import { useLocation, useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const [otp, setOtp] = useState(""); // Store entered OTP
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP
  const [error, setError] = useState(""); // Store error messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // Control OTP sent Snackbar visibility
  const [verifyEnabled, setVerifyEnabled] = useState(false); // Enable/disable Verify button
  const [verificationSuccess, setVerificationSuccess] = useState(false); // Control verification success Snackbar
  const navigate = useNavigate();
  const location = useLocation();
  const { emailMobile } = location.state || {};

  const ResendOtp = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
  });

  // Function to generate and send OTP
  const sendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit random OTP
    setGeneratedOtp(randomOtp);
    setOpenSnackbar(true); // Show OTP in Snackbar
  };

  // Automatically send OTP when the user lands on the page
  useEffect(() => {
    sendOtp();
  }, []);

  // Handle OTP submission
  const handleSubmit = () => {
    if (otp === generatedOtp.toString()) {
      setVerificationSuccess(true); // Show success message in Snackbar
      setTimeout(() => {
        navigate("/dashboardscreen"); // Redirect after a 2-second delay
      }, 2000);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Enable Verify button when OTP length is 6
  useEffect(() => {
    if (otp.length === 6) {
      setVerifyEnabled(true);
    } else {
      setVerifyEnabled(false);
    }
  }, [otp]);

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleVerificationSnackbarClose = () => {
    setVerificationSuccess(false);
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
        <Box flex={1} p={4.5} mt={1} component={"form"}>
          <Box flex={1} sx={{ width: "330px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
            </Box>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Verify OTP
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              to access the CN Books.
            </Typography>

            <TextField
              sx={{ marginBottom: 1.4 }}
              size="small"
              fullWidth
              defaultValue={emailMobile}
              InputProps={{
                readOnly: true,
              }}
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
            />

            {error && <Typography color="red">{error}</Typography>}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Align "Resend OTP" button to the right
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <ResendOtp onClick={sendOtp}>Resend OTP</ResendOtp>
            </Box>

            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              disabled={!verifyEnabled} // Disable button until OTP is filled
              sx={{
                backgroundColor: verifyEnabled ? "#5BC4FA" : "#C0E8FB",
                mt: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Verify
            </Button>

            {/* Social Login */}
            <Typography variant="body2" color="#000000" mt={2}>
              Or login with
            </Typography>
            <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
              <img src={images.googleicon} width={24} alt="googleicon" />
              <img src={images.facebookicon} width={24} alt="facebookicon" />
              <img src={images.linkedinicon} width={24} alt="linkedinicon" />
              <img src={images.xicon} width={24} alt="xicon" />
              <img src={images.appleicon} width={24} alt="appleicon" />
              <img src={images.windowsicon} width={24} alt="windowsicon" />
            </Box>
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
          <img src={images.otpImg} alt="Illustration" width="350px" height="auto" />
        </Box>
      </Box>

      {/* Snackbar to show OTP sent */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          OTP sent: {generatedOtp}
        </Alert>
      </Snackbar>

      {/* Snackbar to show OTP verification success */}
      <Snackbar
        open={verificationSuccess}
        autoHideDuration={2000}
        onClose={handleVerificationSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleVerificationSnackbarClose} severity="success" sx={{ width: '100%' }}>
          OTP verification was successfully completed!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OtpScreen;