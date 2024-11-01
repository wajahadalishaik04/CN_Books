import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { CheckCircle, Info as InfoIcon } from "@mui/icons-material";
import { images } from "../utils/ImgUtils";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [emailMobile, setEmailMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false); // Added for checkbox
  const [formSubmitted, setFormSubmitted] = useState(false); // To track form submission attempt
  const isMobile = useMediaQuery("(max-width:600px)");

  // Password validation state
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    numeric: false,
  });

  // Regex for validation
  const passwordRequirements = {
    length: (password) => password.length >= 8 && password.length <= 16,
    uppercase: (password) => /[A-Z]/.test(password),
    lowercase: (password) => /[a-z]/.test(password),
    specialChar: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    numeric: (password) => /\d/.test(password),
  };

  // Validation function for email/mobile input
  const handleEmailMobileChange = (e) => {
    const value = e.target.value;
    setEmailMobile(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10,}$/;
    setEmailError(!(emailRegex.test(value) || mobileRegex.test(value)));
  };

  // Password validation function
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValidations({
      length: passwordRequirements.length(value),
      uppercase: passwordRequirements.uppercase(value),
      lowercase: passwordRequirements.lowercase(value),
      specialChar: passwordRequirements.specialChar(value),
      numeric: passwordRequirements.numeric(value),
    });

    setPasswordError(
      !(
        passwordRequirements.length(value) &&
        passwordRequirements.uppercase(value) &&
        passwordRequirements.lowercase(value) &&
        passwordRequirements.specialChar(value) &&
        passwordRequirements.numeric(value)
      )
    );
  };

  // Checkbox handler
  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
    setCheckboxError(!e.target.checked); // Added to show error if unchecked
  };
  // Keyboard event handler for "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Submit handler
  const handleSubmit = () => {
    setFormSubmitted(true); // Mark form as submitted

    // Validate email and password
    setEmailError(!emailMobile); // Show error if email/mobile is empty
    setPasswordError(!password); // Show error if password is empty
    setCheckboxError(!checkboxChecked); // Show error if checkbox is not checked

    if (
      !emailError &&
      !passwordError &&
      checkboxChecked &&
      emailMobile &&
      password
    ) {
      navigate("/verifyscreen", { state: { emailMobile } });
    }
  };

  return (
    <>
      <Box
        flex={1}
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
          width={isMobile ? "90%" : "800px"}
          height="auto"
          sx={{ flexDirection: isMobile ? "column" : "row" }}
        >
          {/* Left Side - Sign Up Form */}
          <Box flex={1} p={6}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ position: "relative", right: "7px" }}
            >
              <img
                src={images.CN_Horizontal}
                alt="Logo"
                style={{ width: 180, maxWidth: "100%" }}
              />
            </Box>
            <Box width={isMobile ? "100%" : "330px"} flex={1}>
              <Typography variant="h5" fontWeight={500} mt={2} mb={2}>
                Sign up to access CN Books
              </Typography>

              {/* Email/Mobile Input */}
              <Box sx={{ marginBottom: 1 }}>
                <TextField
                  size="small"
                  type="text"
                  required
                  placeholder="Enter Email Id/ Mobile Number"
                  fullWidth
                  value={emailMobile}
                  onKeyDown={handleKeyDown} // Keyboard event for Enter key
                  onChange={handleEmailMobileChange}
                  error={emailError && formSubmitted}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3", // Apply background color only to input field
                      "&:hover": { backgroundColor: "#FFF" },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF",
                        borderColor: "#5BC4FA",
                      },
                    },
                  }}
                />
                {/* Display the error message separately in a <p> element */}
                {emailError && formSubmitted && (
                  <Typography
                    color="error"
                    variant="body2"
                    style={{
                      paddingLeft: "3px",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    Please enter a valid email or mobile number
                  </Typography>
                )}
              </Box>

              <Box>
                {/* Password Input with Hover Info */}
                <TextField
                  size="small"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown} // Keyboard event for Enter key
                  error={passwordError && formSubmitted}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                              <li
                                style={{
                                  color: passwordValidations.length
                                    ? "#F3F3F3"
                                    : "#5BC4FA",
                                }}
                              >
                                <CheckCircle /> 8-16 characters
                              </li>
                              <li
                                style={{
                                  color: passwordValidations.uppercase
                                    ? "#F3F3F3"
                                    : "#5BC4FA",
                                }}
                              >
                                <CheckCircle /> One uppercase letter
                              </li>
                              <li
                                style={{
                                  color: passwordValidations.lowercase
                                    ? "#5BC4FA"
                                    : " #F3F3F3",
                                }}
                              >
                                <CheckCircle /> One lowercase letter
                              </li>
                              <li
                                style={{
                                  color: passwordValidations.specialChar
                                    ? "#5BC4FA"
                                    : "#F3F3F3",
                                }}
                              >
                                <CheckCircle /> One special character
                              </li>
                              <li
                                style={{
                                  color: passwordValidations.numeric
                                    ? "#5BC4FA"
                                    : "#F3F3F3",
                                }}
                              >
                                <CheckCircle /> One numeric value
                              </li>
                            </ul>
                          }
                          arrow
                        >
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F3F3F3",
                      "&:hover": { backgroundColor: "#FFF" },
                      "&.Mui-focused": {
                        backgroundColor: "#EBF9FF",
                        borderColor: "#5BC4FA",
                      },
                    },
                  }}
                />
                {/* Separate <p> element for error message */}
                {passwordError && formSubmitted && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{
                      paddingLeft: "3px",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    Please enter a valid password
                  </Typography>
                )}
              </Box>

              {/* Checkbox */}
              <FormControlLabel
               sx={{marginTop:1.5}}
                required
                control={
                  <Checkbox
                    size={"small"}
                    checked={checkboxChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I agree to the Terms and Conditions"
              />
              {checkboxError && formSubmitted && (
                <Typography color="error" variant="body2" paddingLeft="2px">
                  Please agree to the terms and conditions.
                </Typography>
              )}

              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#6666FF",
                  mt: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" color="#000000" mt={2}>
                Or login with
              </Typography>
              {/* Social Icons */}
              <Box
                display="flex"
                justifyContent={ "flex-start"}
                gap={2}
                mt={1}
                
              >
                <img src={images.googleicon} width={24} alt="googleicon" />
                <img src={images.facebookicon} width={24} alt="facebookicon" />
                <img src={images.linkedinicon} width={24} alt="linkedinicon" />
                <img src={images.xicon} width={24} alt="xicon" />
                <img src={images.appleicon} width={24} alt="appleicon" />
                <img src={images.windowsicon} width={24} alt="windowsicon" />
              </Box>

              <Typography variant="body1" sx={{ fontWeight: 400 }} mt={1}>
                Have a CN Books Account?
                <Link
                  to={"/signin"}
                  style={{
                    color: "#6666FF",
                    textDecoration: "none",
                    marginLeft: 2.5,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ borderRight: "1.5px solid #EFEFEF" }}></Box>
          {/* Right Side - Illustration Image */}
          {!isMobile &&(
            <Box
            flex={1}
            sx={{
              display: { xs: "none", sm: "block", padding: "14px" },
            }}
          >
            <img
              src={images.signupImg}
              alt="signupImg"
              style={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </Box>
          )}
          
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
