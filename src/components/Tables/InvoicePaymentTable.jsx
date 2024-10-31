import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputBase,
  Box,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/system";
import { Calculate, CheckCircleRounded } from "@mui/icons-material";
import { MdCalculate, MdOutlineCalculate } from "react-icons/md";

// Styled Table Cell for border consistency
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  border: "0.5px solid #ddd",
  padding: "5px",
  backgroundColor: "#FFFFFF", // Background color of the table cells
  fontSize: "14px", // Adjust font size
  color: "#333", // Text color similar to the screenshot
}));

// Example of passing dynamic data
const ItemsData = [
 
  { details: "", quantity: "", rate: "", tax: "", amount: "" },
  
];

const InvoicePaymentTable = () => {
  const [items, setItems] = useState(ItemsData);

  // Handle the tax change event
  const handleTaxChange = (event, index) => {
    const updatedItems = [...items];
    updatedItems[index].tax = event.target.value || ""; // Update the tax value in the state
    setItems(updatedItems); // Set the updated state
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}
    >
      {/* Table Header Row with Item Table Title and Bulk Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          bgcolor: "#F9FAFB",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "1.14rem" }}>
          Item Table
        </Typography>
        <Button
          sx={{ color: "#6666FF" }}
          startIcon={<CheckCircleRounded sx={{ color: "#6666FF" }} />}
        >
          Bulk Actions
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <CustomTableCell>
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                fontSize={"0.9rem"}
              >
                ITEM DETAILS
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="center">
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                QUANTITY
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="center">
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                RATE
                <MdOutlineCalculate
                  size={20}
                  fontWeight={450}
                  style={{ position: "relative", top: 4, left: 4 }}
                />
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="center">
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                TAX
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{
                    position: "relative",
                    top: 4,
                    left: 4,
                    fontWeight: 450,
                  }}
                />
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="center">
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                AMOUNT
              </Typography>
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <CustomTableCell>
                <InputBase
                  placeholder="Type or click to select an item"
                  defaultValue={item?.details || ""}
                  fullWidth
                  sx={{ fontSize: "14px", padding: "0 29px" }}
                />
              </CustomTableCell>
              <CustomTableCell align="right">
                <InputBase
                  defaultValue={item?.quantity || ""}
                  sx={{ fontSize: "14px", textAlign: "right" }}
                />
              </CustomTableCell>
              <CustomTableCell align="center">
                <InputBase
                  defaultValue={item?.rate || ""}
                  sx={{ fontSize: "14px", textAlign: "center" }}
                />
              </CustomTableCell>
              <CustomTableCell align="center">
                <Select
                  sx={{ minWidth: 150, fontSize: "14px" }}
                  size="small"
                  value={item?.tax || ""} // Controlled by state
                  onChange={(event) => handleTaxChange(event, index)} // Update on change
                  displayEmpty
                >
                  <MenuItem value="">Select a Tax</MenuItem>
                  <MenuItem value={5}>5%</MenuItem>
                  <MenuItem value={10}>10%</MenuItem>
                  <MenuItem value={18}>18%</MenuItem>{" "}
                  {/* Add missing tax value */}
                  <MenuItem value={226}>226%</MenuItem>
                </Select>
              </CustomTableCell>

              <CustomTableCell align="center">
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  {item?.amount || ""}
                </Typography>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoicePaymentTable;
