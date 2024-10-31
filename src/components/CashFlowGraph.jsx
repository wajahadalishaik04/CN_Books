import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Add, HelpOutline, KeyboardArrowDown } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CashFlowGraph = () => {
  // Data for the chart
  const data = {
    labels: [
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
      "Jan 2025",
      "Feb 2025",
      "Mar 2025",
    ],
    datasets: [
      {
        label: "Cash Flow",
        data: [0, 50, 100, 200, 350, 400, 400, 400, 400, 400, 400, 400],
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        fill: true,
        pointBackgroundColor: "#4a90e2",
        pointBorderColor: "#4a90e2",
        tension: 0.4,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} K`, // Add "K" to y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
  };

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            padding: 0,
          },
        }}
      >
        {/* Header Section */}
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
            Cash Flow{" "}
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
            This Fiscal Year
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

        {/* Content Section */}
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          {/* Line Chart */}
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Line data={data} options={options} />
          </Box>

          {/* Right Side Content */}
          <Box
            sx={{
              borderLeft: "1.5px solid #EFEFEF",
              minHeight: 200,
              mx: 1.5,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              px:1.2,
              mx:1.2
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="body2"
                textAlign={"end"}
                color="text.secondary"
              >
                Cash as on 01/04/2024
              </Typography>
              <Typography variant="h6" textAlign={"end"}>
                ₹0.00
              </Typography>
            </Box>
            <Box mt={1.2} display={"flex"} flexDirection={"column"}>
              <Typography
                variant="body2"
                textAlign={"end"}
                color="success.main"
              >
                Incoming
              </Typography>
              <Box display={"flex"} >
              <Typography variant="h6" textAlign={"end"}>
                ₹4,02,524.00
              </Typography>
              
                <Typography position={"relative"}left={7}top={1} variant="subtitle1">+</Typography>
              </Box>
            </Box>
            <Box mt={1.2} display={"flex"} flexDirection={"column"}>
              <Typography
                variant="body2"
                textAlign={"end"}
                color="error"
              >
                Outgoing
              </Typography>
              <Box display={"flex"}>
              <Typography variant="h6" textAlign={"end"}>
                ₹0.00
              </Typography>
              
                <Typography position={"relative"}left={7}top={1} variant="subtitle1">-</Typography>
              </Box>
            </Box>
            <Box mt={1.2} display={"flex"} flexDirection={"column"}>
              <Typography
                variant="body2"
                textAlign={"end"}
                color="#1976D2"
              >
                Cash as on 31/03/2025
              </Typography>
              <Box display={"flex"}justifyContent={"flex-end"}>
              <Typography variant="h6" >
                ₹4,02,524.00
              </Typography>
              
                <Typography position={"relative"}left={7}top={1} variant="subtitle1">=</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CashFlowGraph;
