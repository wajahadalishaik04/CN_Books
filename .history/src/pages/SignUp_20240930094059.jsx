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
  const [checkboxError, setCheckboxError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    setCheckboxError(!e.target.checked);
  };

  // Submit handler
  const handleSubmit = () => {
    setFormSubmitted(true);

    setEmailError(!emailMobile);
    setPasswordError(!password);
    setCheckboxError(!checkboxChecked);

    if (!emailError && !passwordError && checkboxChecked && emailMobile && password) {
      navigate("/verifyscreen", { state: { emailMobile } });
    }
  };

  return (
    <Box
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
        width={{ xs: "90%", sm: "800px" }}
        height="auto"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Box flex={1} p={6} mt={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <img src={images.codersnestLogo} alt="Logo" style={{ width: 200 }} />
          </Box>
          <Box width={"330px"} flex={1} component={"form"}>
            <Typography variant="h5" fontWeight={500} mt={2} mb={2}>
              Sign up to access CN Books
            </Typography>

            <TextField
              size="small"
              type="text"
              required
              placeholder="Enter Email Id/ Mobile Number"
              fullWidth
              value={emailMobile}
              onChange={handleEmailMobileChange}
              error={emailError && formSubmitted}
              helperText={
                emailError && formSubmitted ? "Please enter a valid email or mobile number" : ""
              }
              sx={{ marginBottom: 1.4, backgroundColor: "#F3F3F3" }}
            />

            <TextField
              size="small"
              type="password"
              placeholder="Password"
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
              error={passwordError && formSubmitted}
              helperText={passwordError && formSubmitted ? "Please enter a valid password" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          <li style={{ color: passwordValidations.length ? "blue" : "red" }}>
                            <CheckCircle /> 8-16 characters
                          </li>
                          <li style={{ color: passwordValidations.uppercase ? "blue" : "red" }}>
                            <CheckCircle /> One uppercase letter
                          </li>
                          <li style={{ color: passwordValidations.lowercase ? "blue" : "red" }}>
                            <CheckCircle /> One lowercase letter
                          </li>
                          <li style={{ color: passwordValidations.specialChar ? "blue" : "red" }}>
                            <CheckCircle /> One special character
                          </li>
                          <li style={{ color: passwordValidations.numeric ? "blue" : "red" }}>
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
              sx={{ backgroundColor: "#F3F3F3" }}
            />

            <FormControlLabel
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
              <Typography color="error" variant="body2">
                Please agree to the terms and conditions.
              </Typography>
            )}

            <Button onClick={handleSubmit} variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </Box>
          

        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
