import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  styled,
  InputBase,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/otpscreen");
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
        width={"800px"}
        display="flex"
        bgcolor="#fff"
        boxShadow={3}
        marginTop={2}
        borderRadius="8px"
        overflow="hidden"
        height="500px"
      >
        {/* Left Side - Login Form */}
        <Box flex={1} p={4.5} mt={1}>
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
          <Box width={"320px"} flex={1}>
            <Typography variant="h5" fontWeight={500} mt={2}>
              Sign in
            </Typography>
            <Typography variant="body2" color="default" mb={2}>
              to access CN Books
            </Typography>

            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="Enter Email Id/ Mobile Number"
              sx={{
                backgroundColor: "#F3F3F3",
                "&:hover": {
                  backgroundColor: "#FFF", // Changes background color on hover
                },
                "& .Mui-focused": {
                  backgroundColor: "#FFF", // Changes background color on focus
                },
              }}
            />

            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#5BC4FA", mt: 2 }}
            >
              Next
            </Button>

            <Typography variant="body2" color="#000000" mt={2}>
              Or login with
            </Typography>
          </Box>
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
              style={{ color: "#5BC4FA", textDecoration: "none" }}
            >
              Sign Up Now
            </Link>
          </Typography>
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
            src={images.loginImg}
            alt="Illustration"
            width="350px"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Signin;
