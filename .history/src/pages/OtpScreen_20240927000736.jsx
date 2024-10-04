import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { useNavigate } from "react-router-dom";
import axios 
const OtpScreen = () => {
  const [otp, setOtp] = useState(""); // Store entered OTP
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate();

  const ResendOtp = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
  });

  // Function to send OTP (called on Resend button click)
  const sendOtp = async () => {
    try {
      const response = await axios.post("https://api.example.com/send-otp", {
        phoneNumber: "1234567890", // replace with user's phone number
      });
      if (response.data.success) {
        console.log("OTP sent successfully");
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
    }
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://api.example.com/verify-otp", {
        phoneNumber: "1234567890", // replace with user's phone number
        otp: otp,
      });
      if (response.data.success) {
        navigate("/dashboardscreen");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      setError("Something went wrong. Please try again.");
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
        <Box flex={1} p={4.5} mt={1} component={"form"}>
          <Box flex={1} sx={{ width: "330px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
            </Box>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Sign in
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              to access CN Books
            </Typography>

            <TextField
              sx={{ marginBottom: 1.4 }}
              size="small"
              fullWidth
              defaultValue="codersnest@gmail.com"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

            <TextField
              size="small"
              type="password"
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

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ResendOtp onClick={sendOtp}>Resend OTP</ResendOtp>
            </Box>

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
              Next
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
    </Box>
  );
};

export default OtpScreen;
