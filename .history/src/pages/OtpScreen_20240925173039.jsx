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
import { useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const ResendOtp = styled(Button)({
    textTransform:"none",
    fontSize:"1rem",
  });
  const navigate = useNavigate();
  const handleSubmit = ()=>
    {
      navigate("/signup");
  
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
        <Box flex={1} p={4.5} mt={1}component={"form"}sx={{width:"330px"}} >
          <Box width={}></Box>
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
          <Typography variant="h5" fontWeight={500} mt={2}>
            Sign in
          </Typography>
          <Typography variant="body2" color="default" mb={2}>
            to access CN Books
          </Typography>
          <TextField
          
          size="small"
          fullWidth
          sx={{marginBottom:"4%"}}
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
              sx={{
                
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
            <Box sx={{display:"flex",justifyContent:"flex-end"}}>
            <ResendOtp>Resend OTP </ResendOtp>
            </Box>
            <Button onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#5BC4FA", mt: 2,textTransform:"none",fontSize:"1rem" }}
            >
              Next
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
            width="350px"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default OtpScreen;
