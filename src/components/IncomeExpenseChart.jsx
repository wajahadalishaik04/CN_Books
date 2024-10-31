import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Add,
  HelpOutline,
  KeyboardArrowDown,
  Remove,
} from "@mui/icons-material";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = () => {
  const [selectedMode, setSelectedMode] = useState("Accrual"); // Toggle between Accrual or Cash
  const [viewType, setViewType] = useState("Income"); // Toggle between Income or Expense view

  // Data for Income or Expense view
  const data = {
    labels: [
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
    ],
    datasets: [
      {
        label: viewType === "Income" ? "Income" : "Expense",
        data:
          viewType === "Income"
            ? [60000, 70000, 50000, 30000, 20000, 60000, 70000]
            : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: viewType === "Income" ? "green" : "red",
        barThickness: 12,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleToggle = (mode) => setSelectedMode(mode);
  const handleViewChange = (type) => setViewType(type);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: 2,
      }}
    >
      {/* Income and Expense Section */}
      <Card sx={{ width: "45%", borderRadius: "8px" }}>
        <CardContent sx={{ "&.MuiCardContent-root": { padding: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F9FAFB",
              borderBottom: "1.5px solid #EFEFEF",
              padding: 1,
            }}
          >
            <Typography variant="h6">
              Income and Expense{" "}
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

          {/* Accrual and Cash Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              mr: 2,
            }}
          >
            <Box>
              <Button
                sx={{
                  borderRadius: "8px 0px 0px 8px",
                  height: "35px",
                  border: "1px solid #ccc",
                  textTransform: "none",
                }}
                variant={selectedMode === "Accrual" ? "contained" : "outlined"}
                size="small"
                onClick={() => handleToggle("Accrual")}
              >
                Accrual
              </Button>
              <Button
                sx={{
                  borderRadius: "0px 8px 8px 0px",
                  height: "35px",
                  border: "1px solid #ccc",
                }}
                variant={selectedMode === "Cash" ? "contained" : "outlined"}
                size="small"
                onClick={() => handleToggle("Cash")}
              >
                Cash
              </Button>
            </Box>
          </Box>

          {/* Income and Expense Buttons */}

          {/* Bar Chart */}
          <Box borderBottom={"1.5px solid #EFEFEF"} padding={2}>
            <Bar data={data} options={options} />
          </Box>

          {/* Total Income and Expenses */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              padding: 2,
            }}
          >
            <Box mt={1}>
              <Box>
                <Button
                  variant={viewType === "Income" ? "contained" : "outlined"}
                  sx={{
                    mx: 1,
                    width: 10,
                    height: 10,
                    backgroundColor: "success.main",
                  }}
                  onClick={() => handleViewChange("Income")}
                />
                <Typography variant="span" sx={{ color: "#333" }}>
                  Income
                </Typography>
              </Box>
              <Box>
                <Button
                  variant={viewType === "Expense" ? "contained" : "outlined"}
                  sx={{
                    mx: 1,
                    width: 8,
                    height: 8,
                    backgroundColor: "error.main",
                  }}
                  onClick={() => handleViewChange("Expense")}
                />
                <Typography variant="span" sx={{ color: "#333" }}>
                  Expense
                </Typography>
              </Box>
            </Box>
            <Box sx={{ borderRight: "1.5px solid #EFEFEF" }} />
            <Box>
              <Typography sx={{ color: "green" }}>Total Income</Typography>
              <Typography sx={{ color: "black" }}>₹2,76,800.00 </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "red" }}>Total Expenses</Typography>
              <Typography sx={{ color: "black" }}>₹0.00</Typography>
            </Box>
          </Box>
          <Box px={2} mb={2} mx={3}>
            <ul style={{fontFamily:`"Roboto","Helvetica","Arial","sans-serif"`}}>
              <li style={{fontSize:"0.82rem",color:"#888"}}>
                
                Income and expense values displayed are exclusive of taxes
              </li>
            </ul>
          </Box>
        </CardContent>
      </Card>

      {/* Top Expenses Section */}
      <Card sx={{ width: "45%", borderRadius: "8px" }}>
        <CardContent sx={{ "&.MuiCardContent-root": { padding: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F9FAFB",
              borderBottom: "1.5px solid #EFEFEF",
              padding: 1,
            }}
          >
            <Typography variant="h6">
              Top Expenses{" "}
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
                  color: "#6666FF",
                }}
              />
            </Typography>
          </Box>
          <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:'column',padding:10 }}>
            <Typography sx={{ fontSize: "1rem", color: "#999" }}>
              No Expense recorded for this fiscal year
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IncomeExpenseChart;
