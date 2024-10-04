import { Box } from "@mui/material";
import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const WrapComponent = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box flex={1}>
          <Header />
          <Outlet/>
        </Box>
      </Box>
    </>
  );
};

export default WrapComponent;
