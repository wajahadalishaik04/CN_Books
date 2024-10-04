import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import { images } from "../utils/ImgUtils";
import { Padding } from "@mui/icons-material";

const CustomerTable = () => {
  const createData = (
    Name,
    EMail,
    PhoneNo,
    CompanyName,
    PlaceofSupply,
    Receivables,
    ActionItem
  ) => {
    return {
      Name,
      EMail,
      PhoneNo,
      CompanyName,
      PlaceofSupply,
      Receivables,
      ActionItem,
    };
  };

  const rows = [
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
  ];

  return (
    <>
      <Box
        flex={1}
        sx={{
          border: "1px solid #A7A7A7",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0 22px",
          marginTop: 3,
        }}
      >
        {/* Responsive container */}
        <TableContainer
          component={Paper}
          sx={{ maxHeight: { xs: "400px", md: "auto" }, overflowX: "auto" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#D6F1FF" }}>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">E-Mail</TableCell>
                <TableCell align="center">Phone-No</TableCell>
                <TableCell align="center">Company Name</TableCell>
                <TableCell align="center">Place of Supply</TableCell>
                <TableCell align="center">Receivables</TableCell>
                <TableCell align="center">Action Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "1px solid #EFEFEF",
                    },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell align="center">{row.EMail}</TableCell>
                  <TableCell align="center">{row.PhoneNo}</TableCell>
                  <TableCell align="center">{row.CompanyName}</TableCell>
                  <TableCell align="center">{row.PlaceofSupply}</TableCell>
                  <TableCell align="center">{row.Receivables}</TableCell>

                  {/* Render the icons in a single TableCell */}
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    <img
                      src={images.binicon}
                      alt="Bin Icon"
                      style={{
                        width: "22px",
                        height: "22px",
                        marginRight: "10px",
                      }}
                    />
                    <Box sx={{ backgroundClip: "border-box" }}>
                      <img
                        src={images.editicon}
                        alt="Edit Icon"
                        style={{
                          width: "22px",
                          height: "22px",
                          marginRight: "10px",
                          style={{ filter: 'invert(100%) sepia(100%) saturate(1000%) hue-rotate(90deg) brightness(0.5)' }}
                        }}
                      />
                    </Box>
                    <img
                      src={images.hiddenicon}
                      alt="Hidden Icon"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "flex", sm: "none" } }}
                  >
                    <img
                      src={images.verticaldoticon}
                      alt="Hidden Icon"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CustomerTable;
