import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { images } from "../utils/ImgUtils";

const CustomerTable = () => {
  // Create row data with a unique ID
  const createData = (
    id,
    Name,
    EMail,
    PhoneNo,
    CompanyName,
    PlaceofSupply,
    Receivables
  ) => {
    return {
      id,
      Name,
      EMail,
      PhoneNo,
      CompanyName,
      PlaceofSupply,
      Receivables,
      hidden: false, // Add hidden property to control row visibility
    };
  };

  // Initial rows data
  const initialRows = [
    createData(1, "John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData(2, "Jane Doe", "jane.doe@example.com", "0987654321", "TechNest", "Maharashtra", "₹ 100.00"),
    // Add more rows as needed
  ];

  // State to manage rows
  const [rows, setRows] = useState(initialRows);

  // Handle delete action
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id)); // Remove row from data
  };

  // Handle hide action
  const handleHide = (id) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, hidden: !row.hidden } : row
      )
    );
  };

  // Handle edit action (you can implement your own logic to edit row data)
  const handleEdit = (id) => {
    alert(`Edit row with ID: ${id}`);
    // Open a modal or popup to edit the row
  };

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
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) =>
                row.hidden ? null : ( // Conditionally render rows based on hidden status
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.Name}</TableCell>
                    <TableCell align="center">{row.EMail}</TableCell>
                    <TableCell align="center">{row.PhoneNo}</TableCell>
                    <TableCell align="center">{row.CompanyName}</TableCell>
                    <TableCell align="center">{row.PlaceofSupply}</TableCell>
                    <TableCell align="center">{row.Receivables}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <img
                          src={images.editicon}
                          alt="Edit"
                          style={{ width: "22px", height: "22px" }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <img
                          src={images.binicon}
                          alt="Delete"
                          style={{ width: "22px", height: "22px" }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleHide(row.id)}>
                        <img
                          src={images.hiddenicon}
                          alt="Hide"
                          style={{ width: "22px", height: "22px" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CustomerTable;
