// src/Login.jsx
import React from "react";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { images } from "../utils/ImgUtils";
const LoginScreen = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/signin");
  };
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
      <img
          src={images.CN_Vertical}
          alt="Coders Nest"
          style={{ width: "50%", height: "auto" }}
        />
      

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
          textTransform: "none",
          fontSize:"1rem",
          backgroundColor: "#6666FF",
          "&:hover": {
            backgroundColor: "#539gd2",
          },
        }}
      >
        Log In
      </Button>

      <Typography>
        Don’t have an account?{" "}
        <Link href="/signup" variant="body2" sx={{ color: "#6666FF", textDecoration:"none" }}>
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
