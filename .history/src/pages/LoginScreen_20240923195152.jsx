// src/Login.jsx
import React from "react";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { images } from "../utils/ImgUtils";
const LoginScreen = () => {
  const navigate = useNavigate();
  const handleSubmit = ()=>
  {
    navigate("/signin");

  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box>
        <img
          src={images.codersnest}
          alt="Coders Nest"
          style={{ width: "60%", height: "auto" }}
        />
      </Box>

      <Typography component="h2" variant="h5" sx={{ marginTop: ".5rem" }}>
        Login to Access CN Books
      </Typography>

      <Button 
      onClick={handleSubmit}
        variant="contained"
        
        sx={{
          marginTop: "1.5rem",
          marginBottom: "1rem",
          width: "40%",
          texy
                  backgroundColor: "#5db2ff",
          "&:hover": {
            backgroundColor: "#539gd2",
          },
        }}
      >
        Log In
      </Button>

      <Typography>
        Don’t have an account?{" "}
        <Link href="#" variant="body2" sx={{ color: "#5db2ff" }}>
          Sign Up
        </Link>
      </Typography>

      <Box
        sx={{
          marginTop: "4rem",
          color: "text.secondary",
        }}
      >
        <Typography variant="caption" display="block">
          © Codersnest – 2023. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginScreen;
