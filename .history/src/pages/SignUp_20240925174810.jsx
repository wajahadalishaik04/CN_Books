import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  styled,
  InputBase,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { images } from "../utils/ImgUtils";
import { CheckBox } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = ()=>
    {
      navigate("/verifyscreen");
  
    }


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
        width="800px"
        height="500px"
      >
        {/* Left Side - Login Form */}
        <Box flex={1} p={6} mt={1}>
          <Box
            display="flex"
            component={"form"}
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
          <Box width={"330px"} flex={1}>
          <Typography variant="h5" fontWeight={500} mt={2} mb={2}>
            Sign up to access CN Books
          </Typography>

          <TextField
            size="small"
            type="text"
            placeholder="Enter Email Id/ Mobile Number"
            sx={{
              width: "100%",
              fontWeight: "500",
              marginBottom: "15px",
              backgroundColor: "#F3F3F3",
              "&:hover": {
                backgroundColor: "#FFF", // Changes background color on hover
              },
              "& .Mui-focused": {
                backgroundColor: "#FFF", // Changes background color on focus
              },
            }}
          />

          <TextField
            size="small"
            type="password"
            placeholder="Password"
            sx={{
              width: "100%",
              fontWeight: "500",
              backgroundColor: "#F3F3F3",
              "&:hover": {
                backgroundColor: "#FFF", // Changes background color on hover
              },
              "& .Mui-focused": {
                backgroundColor: "#FFF", // Changes background color on focus
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
              control={<Checkbox size={"small"} />}
              label="I agree to the Terms and Conditions"
              color="#030303"
            />
          </Box>
          <Button onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#5BC4FA", mt: 2,textTransform:'none',fontSize:"1rem" }}
          >
            Sign Up
          </Button>
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
          <Typography variant="body1" sx={{ fontWeight: 400 }} mt={2}>
               Have a CN Books Account?
              <Link to={"/signin"} style={{ color: "#5BC4FA", textDecoration: "none" }}>
                Sign In 
              </Link>
            </Typography>

        </Box>
        </Box>
        <Box
          sx={{ borderRight: "1.5px solid #EFEFEF", paddingLeft: "2%" }}
        ></Box>

        {/* Right Side - Illustration Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex", paddingLeft: "1%" } }}
        >
          <img
            src={images.signupImg}
            alt="Illustration"
            width="370px"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;
