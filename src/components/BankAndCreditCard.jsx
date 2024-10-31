import React from "react";
import { HelpOutline, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const BankAndCreditCard = () => {
  return (
    <>
      <Card sx={{ width: "45%", borderRadius: "8px" }}>
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: 0,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F9FAFB",
              borderBottom: "1.5px solid #EFEFEF ",
              padding: 1,
            }}
          >
            <Typography variant="h6">
              Bank And Credit Cards{" "}
              <HelpOutline
                sx={{
                  position: "relative",
                  top: 3,
                  left: 2,
                  width: 18,
                  height: 18,
                  color: "#ccc",
                }}
              />
            </Typography>
            <Typography variant="subtitle2">
              This Fiscal Year{" "}
              <KeyboardArrowDown
                sx={{
                  position: "relative",
                  top: 5,
                  left: 2,
                  width: 18,
                  height: 18,
                  color: "#5BC4FA",
                }}
              />
            </Typography>
          </Box>
          <Box sx={{ padding: 10, display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ fontSize: "1rem", textDecoration: "none", color: "#ccc" }}
            >
              Yet to add Bank and Credit Card Details
            </Typography>
            <Typography
              component={Link}
              to={"/addBankaccount"}
              sx={{
                fontSize: "1rem",
                textDecoration: "none",
                color: "#6666FF",
                textAlign:"center"
              }}
            >
              Add Bank Account
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default BankAndCreditCard;
