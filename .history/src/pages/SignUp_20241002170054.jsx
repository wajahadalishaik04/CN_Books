<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  width="100%"
  minHeight="100vh" // Changed from height="100vh" to minHeight="100vh"
  sx={{
    backgroundImage: "url(/images/BackgroundImg.jpeg)",
    backgroundSize: "cover",
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
    height="auto" // Allow it to grow naturally based on content
    sx={{ flexDirection: { xs: "column", sm: "row" } }}
  >
    {/* Left Side - Sign Up Form */}
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

      {/* Main Form Content */}
      <Box width={"330px"} flex={1} component={"form"}>
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
            onChange={handleEmailMobileChange}
            error={emailError && formSubmitted}
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
          {emailError && formSubmitted && (
            <Typography
              component={"p"}
              style={{
                color: "#D32F2F",
                fontSize: "0.875rem",
                marginTop: "4px",
              }}
            >
              Please enter a valid email or mobile number
            </Typography>
          )}
        </Box>

        {/* Password Input with Hover Info */}
        <TextField
          size="small"
          type="password"
          placeholder="Password"
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
          error={passwordError && formSubmitted}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li
                        style={{
                          color: passwordValidations.length ? "blue" : "red",
                        }}
                      >
                        <CheckCircle /> 8-16 characters
                      </li>
                      <li
                        style={{
                          color: passwordValidations.uppercase ? "blue" : "red",
                        }}
                      >
                        <CheckCircle /> One uppercase letter
                      </li>
                      <li
                        style={{
                          color: passwordValidations.lowercase ? "blue" : "red",
                        }}
                      >
                        <CheckCircle /> One lowercase letter
                      </li>
                      <li
                        style={{
                          color: passwordValidations.specialChar ? "blue" : "red",
                        }}
                      >
                        <CheckCircle /> One special character
                      </li>
                      <li
                        style={{
                          color: passwordValidations.numeric ? "blue" : "red",
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
        {passwordError && formSubmitted && (
          <Typography
            component={"p"}
            style={{
              color: "#D32F2F",
              fontSize: "0.875rem",
              marginTop: "4px",
            }}
          >
            Please enter a valid password
          </Typography>
        )}
      </Box>

      {/* Checkbox and SignUp Button */}
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
      <Typography variant="body2" color="#000000" mt={2}>
                Or login with
              </Typography>
              {/* Social Icons */}
              <Box display="flex" justifyContent="flex-start" gap={2} mt={1}>
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
                    color: "#5BC4FA",
                    textDecoration: "none",
                    marginLeft: 2.5,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
    </Box>
  </Box>
</Box>
