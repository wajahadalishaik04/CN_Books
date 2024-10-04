import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [inputValue, setInputValue] = useState("");
  const [emailMobileError, setEmailMobileError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const StyledButton = styled(Button)({
    backgroundColor: "#5BC4FA",
    marginTop: 12,
    textTransform: "none",
    fontSize: "1rem",
  });

  // Function to validate email or mobile number
  const validateInput = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Validate input while typing
    if (validateInput(value)) {
      setEmailMobileError(false);
    } else {
      setEmailMobileError(true);
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true); // Form has been submitted

    if (!validateInput(inputValue)) {
      setEmailMobileError(true);
    } else {
      setEmailMobileError(false);
      navigate("/otpscreen", { state: { emailMobile: inputValue } });
    }
  };

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      sx={{
        backgroundImage: "url(/images/BackgroundImg.jpeg)",
      }}
    >
      <Box
        width={isMobile ? "90%" : "800px"} // Responsive width
        display="flex"
        bgcolor="#fff"
        boxShadow={3}
        marginTop={2}
        borderRadius="8px"
        overflow="hidden"
        height="500px"
        flexDirection={isMobile ? "column" : "row"} // Adjust for mobile
      >
        {/* Left Side - Login Form */}
        <Box flex={1} p={4.5} mt={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
          </Box>
          <Box width={isMobile ? "100%" : "330px"} flex={1}>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Sign in
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              to access CN Books
            </Typography>

            {/* Email/Mobile Input Field */}
            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Enter Email Id/ Mobile Number"
              value={inputValue}
              onChange={handleInputChange}
              error={formSubmitted && emailMobileError} // Show error if form submitted and input invalid
              helperText={formSubmitted && emailMobileError ? "Enter a valid Email or Mobile Number." : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F3F3F3",
                  "&:hover": {
                    backgroundColor: "#FFF",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#EBF9FF",
                    borderColor: !emailMobileError ? "#5BC4FA" : "red", // Dynamic border color
                  },
                  borderColor: !emailMobileError ? "#5BC4FA" : "red", // Set color based on validity
                },
              }}
            />

            {/* Next Button */}
            <StyledButton onClick={handleSubmit} variant="contained" fullWidth>
              Next
            </StyledButton>

            <Typography variant="body2" color="#000000" mt={2}>
              Or login with
            </Typography>
          </Box>

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
              style={{ color: "#5BC4FA", fontSize: "1rem", textDecoration: "none" }}
            >
              Sign Up Now
            </Link>
          </Typography>
        </Box>
        <Box sx={{ borderRight: "1.5px solid #EFEFEF" }}></Box>

        {/* Right Side - Illustration Image */}
        {!isMobile && (
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={images.loginImg}
              alt="Illustration"
              width="98%"
              height="95%"
              objectFit="cover"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Signin;
