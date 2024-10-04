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
import { Info as InfoIcon } from "@mui/icons-material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"; // Icons for validation status
import { images } from "../utils/ImgUtils";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [emailMobile, setEmailMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [allValid, setAllValid] = useState(false);

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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check the password against all requirements
    setPasswordValidations({
      length: passwordRequirements.length(value),
      uppercase: passwordRequirements.uppercase(value),
      lowercase: passwordRequirements.lowercase(value),
      specialChar: passwordRequirements.specialChar(value),
      numeric: passwordRequirements.numeric(value),
    });

    // If all are true, set password as valid
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

  const handleEmailMobileChange = (e) => {
    const value = e.target.value;
    setEmailMobile(value);
    setEmailError(value.length < 10);
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (!emailError && !passwordError && checkboxChecked) {
      navigate("/verifyscreen");
    } else {
      setAllValid(false);  // Show error if any field is invalid
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ position: "relative", right: "7px" }}
          >
            <img
              src={images.codersnestLogo}
              alt="Logo"
              style={{ width: 200 }}
            />
          </Box>
          <Box width={"330px"} flex={1} component={"form"}>
            <Typography variant="h5" fontWeight={500} mt={2} mb={2}>
              Sign up to access CN Books
            </Typography>

            {/* Email/Mobile Input */}
            <TextField
              size="small"
              type="text"
              required
              placeholder="Enter Email Id/ Mobile Number"
              fullWidth
              value={emailMobile}
              onChange={handleEmailMobileChange}
              error={emailError}
              helperText={emailError ? "Enter at least 10 characters" : ""}
              sx={{
                fontWeight: "500",
                marginBottom: 1.4,
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

            {/* Password Input with Hover Info */}
            <TextField
              size="small"
              type="password"
              placeholder="Password"
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={
                        <>
                          <ul>
                            <li style={{ color: passwordValidations.length ? 'blue' : 'red' }}>
                              {passwordValidations.length ? <CheckIcon /> : <CloseIcon />} Minimum 8-16 characters
                            </li>
                            <li style={{ color: passwordValidations.uppercase ? 'blue' : 'red' }}>
                              {passwordValidations.uppercase ? <CheckIcon /> : <CloseIcon />} One uppercase letter
                            </li>
                            <li style={{ color: passwordValidations.lowercase ? 'blue' : 'red' }}>
                              {passwordValidations.lowercase ? <CheckIcon /> : <CloseIcon />} One lowercase letter
                            </li>
                            <li style={{ color: passwordValidations.specialChar ? 'blue' : 'red' }}>
                              {passwordValidations.specialChar ? <CheckIcon /> : <CloseIcon />} One special character
                            </li>
                            <li style={{ color: passwordValidations.numeric ? 'blue' : 'red' }}>
                              {passwordValidations.numeric ? <CheckIcon /> : <CloseIcon />} One numeric value
                            </li>
                          </ul>
                        </>
                      }
                      arrow
                    >
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                sx: { paddingRight: 1 },
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "8px",
              }}
            >
              <FormControlLabel
                required
                control={
                  <Checkbox size={"small"} checked={checkboxChecked} onChange={handleCheckboxChange} />
                }
                label="I agree to the Terms and Conditions"
                color="#030303"
              />
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
              Sign Up
            </Button>

            {!allValid && (
              <Typography color="red" mt={2}>
                Please complete all fields correctly.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
