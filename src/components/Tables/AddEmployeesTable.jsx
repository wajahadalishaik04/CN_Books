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
  useMediaQuery,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { images } from "../../utils/ImgUtils";
import { truncateEmail } from "../../utils/Helpers";

const AddEmployeesTable = () => {
  const createData = (
    ID,
    Name,
    Email,
    Mobile,
    DateofJoining,
    Department,
    Designation,
    EmploymentStatus,
    DateofBirth,
    Address,
    Bloodgroup
  ) => {
    return {
      ID,
      Name,
      Email,
      Mobile,
      DateofJoining,
      Department,
      Designation,
      EmploymentStatus,
      DateofBirth,
      Address,
      Bloodgroup,
    };
  };

  const [rows, setRows] = useState([
    createData(
      "10024",
      "John Smith",
      "john.smith@example.c",
      "1234567890",
      "13/01/2024",
      "Frontend Developer",
      "IT",
      "Active"
    ),
    createData(
      "10024",
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "13/01/2024",
      "Frontend Developer",
      "IT",
      "Active"
    ),
  ]);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoAction, setUndoAction] = useState(null);
  const [showIcons, setShowIcons] = useState({});
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    setRows((prevRows) => prevRows.filter((r) => r.Name !== row.Name));
  };

  const handleHide = (row) => {
    setHiddenRows((prevHidden) => [...prevHidden, row]);
    setRows((prevRows) => prevRows.filter((r) => r.Name !== row.Name));
    setUndoAction(row);
    setSnackbarOpen(true);

    setTimeout(() => {
      setUndoAction(null);
    }, 3000);
  };

  const handleUndo = () => {
    if (undoAction) {
      setRows((prevRows) => [...prevRows, undoAction]);
      setHiddenRows((prevHidden) =>
        prevHidden.filter((r) => r.Name !== undoAction.Name)
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    }
  };

  const toggleIcons = (rowName) => {
    setShowIcons((prevState) => ({
      ...prevState,
      [rowName]: !prevState[rowName],
    }));
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowIcons({});
    };

    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile]);

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
          // Responsive adjustments for table
          maxWidth: isMobile ? "100%" : "initial",
          overflowX: isMobile ? "auto" : "hidden",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: { xs: "400px", md: "auto" },
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  color: "#FFF",
                  backgroundColor: "#6666FF",
                  padding: 1.5,
                },
              }}
            >
              <TableRow>
                <TableCell align="center"> ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell sx={{ maxWidth: 100 }} align="center">
                  E-Mail
                </TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Date of Joining</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Designation</TableCell>
                <TableCell align="center"> Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.Name}>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.ID}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.Name}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                      maxWidth: 150,
                    }}
                    align="center"
                  >
                    {truncateEmail(row.Email, 21)}{" "}
                    {/* You can adjust the maxLength as needed */}
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.Mobile}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.DateofJoining}
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.Department}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.Designation}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "9.6px",
                    }}
                    align="center"
                  >
                    {row.EmploymentStatus}
                  </TableCell>

                  <TableCell align="center">
                    {!isMobile ? (
                      <>
                        <img
                          src={images.editicon}
                          alt="Edit Icon"
                          style={{
                            cursor: "pointer",
                            width: "  20px",
                            marginRight: "7px",
                            filter: "grayscale(100%) brightness(1.5%)",
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleEdit(row)}
                        />
                        <img
                          src={images.binicon}
                          alt="Delete Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            marginRight: "7px",
                            filter:
                              " invert(37%) sepia(83%) saturate(2155%) hue-rotate(331deg) brightness(99%) contrast(100%)",
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleDelete(row)}
                        />
                        <img
                          src={images.hiddenicon}
                          alt="Hide Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            marginRight: "7px",
                          }}
                          onClick={() => handleHide(row)}
                        />
                      </>
                    ) : (
                      <IconButton onClick={(e) => toggleIcons(row.Name)}>
                        <img src={images.verticaldoticon} alt="Options" />
                      </IconButton>
                    )}
                    {isMobile && showIcons[row.Name] && (
                      <Box display="flex" flexDirection="column" gap={2}>
                        <img
                          src={images.editicon}
                          alt="Edit Icon"
                          style={{ cursor: "pointer", width: "20px" }}
                          onClick={() => handleEdit(row)}
                        />
                        <img
                          src={images.binicon}
                          alt="Delete Icon"
                          style={{ cursor: "pointer", width: "20px" }}
                          onClick={() => handleDelete(row)}
                        />
                        <img
                          src={images.hiddenicon}
                          alt="Hide Icon"
                          style={{ cursor: "pointer", width: "20px" }}
                          onClick={() => handleHide(row)}
                        />
                      </Box>
                    )}
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
            {undoAction && (
              <span
                style={{ cursor: "pointer", color: "#5BC4FA" }}
                onClick={handleUndo}
              >
                Undo
              </span>
            )}
          </span>
        }
        autoHideDuration={3000}
      />
    </>
  );
};

export default AddEmployeesTable;
