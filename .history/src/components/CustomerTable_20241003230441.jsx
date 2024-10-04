import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { images } from "../utils/ImgUtils";

const CustomerTable = () => {
  const createData = (Name, EMail, PhoneNo, CompanyName, PlaceofSupply, Receivables) => {
    return { Name, EMail, PhoneNo, CompanyName, PlaceofSupply, Receivables };
  };

  const [rows, setRows] = useState([
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    createData("John Smith", "john.smith@example.com", "1234567890", "CodersNest", "Karnataka", "₹ 0.00"),
    // Add more rows as needed
  ]);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoAction, setUndoAction] = useState(null);

  const handleEdit = (row) => {
    // Implement the logic to open an edit modal or form with the row data
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    setRows((prevRows) => prevRows.filter((r) => r.Name !== row.Name));
    console.log("Delete:", row);
  };

  const handleHide = (row) => {
    setHiddenRows((prevHidden) => [...prevHidden, row]);
    setRows((prevRows) => prevRows.filter((r) => r.Name !== row.Name));
    setUndoAction(row);
    setSnackbarOpen(true);
    
    setTimeout(() => {
      setUndoAction(null);
    }, 3000); // Hide "Undo" and "Redo" after 3 seconds
  };

  const handleUndo = () => {
    if (undoAction) {
      setRows((prevRows) => [...prevRows, undoAction]);
      setHiddenRows((prevHidden) => prevHidden.filter((r) => r.Name !== undoAction.Name));
      setUndoAction(null);
      setSnackbarOpen(false);
    }
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
        <TableContainer component={Paper} sx={{ maxHeight: { xs: "400px", md: "auto" }, overflowX: "auto" }}>
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
                <TableRow key={row.Name}>
                  <TableCell align="center">{row.Name}</TableCell>
                  <TableCell align="center">{row.EMail}</TableCell>
                  <TableCell align="center">{row.PhoneNo}</TableCell>
                  <TableCell align="center">{row.CompanyName}</TableCell>
                  <TableCell align="center">{row.PlaceofSupply}</TableCell>
                  <TableCell align="center">{row.Receivables}</TableCell>
                  <TableCell align="center">
                    <img
                      src={images.editicon}
                      alt="Edit Icon"
                      style={{ cursor: "pointer", width: "22px", height: "22px", marginRight: "10px" }}
                      onClick={() => handleEdit(row)}
                    />
                    <img
                      src={images.binicon}
                      alt="Bin Icon"
                      style={{ cursor: "pointer", width: "22px", height: "22px", marginRight: "10px" }}
                      onClick={() => handleDelete(row)}
                    />
                    <img
                      src={images.hiddenicon}
                      alt="Hidden Icon"
                      style={{ cursor: "pointer", width: "22px", height: "22px" }}
                      onClick={() => handleHide(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={
          <span>
            Row hidden!{" "}
            {undoAction && <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleUndo}>Undo</span>}
          </span>
        }
        autoHideDuration={3000}
      />
    </>
  );
};

export default CustomerTable;
