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

const VerifyScreen = () => {
  const StyledButton = styled(Button)({
    fontSize:"1rem"
  });
  const navigate = useNavigate();
  const handleSubmit = ()=>
    {
      navigate("/dashboardscreen");
  
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
        width="900px"
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
          <Typography variant="h5" fontWeight={500} mt={2} mb={1}>
            Sign up to access CN Books
          </Typography>
          <Typography varient="body2"  mb={1} fontWeight={450}>Verify your Sign Up</Typography>
          <Typography>Enter the OTP sent to your mobile number.</Typography>
          <Box sx={{display:"flex",  alignItems:"center"}}>
          <Typography variant="span">
          9873448769
          </Typography>
          <Button variant="text" sx={{fontSize:'1rem',}}>Change</Button>
          </Box>
          <TextField
              size="small"
              type="password"
              placeholder="Enter OTP"
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
            <Box sx={{display:"flex",justifyContent:"flex-start"}}>
              <Button variant="text">Resend OTP</Button>
            </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "8px",
            }}
          >
            
          </Box>
          <Button onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#5BC4FA", mt: 1 }}
          >
            Verify
          </Button>
          
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
            src={images.otpImg}
            alt="Illustration"
            width="360px"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default VerifyScreen;
