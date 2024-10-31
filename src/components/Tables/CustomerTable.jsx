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

const CustomerTable = () => {
  const createData = (
    Name,
    EMail,
    PhoneNo,
    CompanyName,
    PlaceofSupply,
    Receivables
  ) => {
    return { Name, EMail, PhoneNo, CompanyName, PlaceofSupply, Receivables };
  };

  const [rows, setRows] = useState([
    createData(
      "John Smith",
      "john.smith@example.com",
      "1234567890",
      "CodersNest",
      "Karnataka",
      "₹ 0.00"
    ),
    createData(
      "John",
      "john.smith@example.com",
      "1234523267890",
      "CoderNest",
      "Karnatka",
      "₹ 120.00"
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

  // Close action icons on mobile when clicking outside
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
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ maxHeight: { xs: "400px", md: "auto" }, overflowX: "auto" }}
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">E-Mail</TableCell>
                <TableCell align="center">Phone-No</TableCell>
                <TableCell align="center">Company Name</TableCell>
                <TableCell align="center">Place of Supply</TableCell>
                <TableCell align="center">Receivables</TableCell>
                <TableCell align="center">Action Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {rows.map((row) => (
                <TableRow key={row.Name}>
                  <TableCell sx={{padding:1.2}} align="center">{row.Name}</TableCell>
                  <TableCell sx={{padding:1.2}} align="center">{truncateEmail(row.EMail,21)}</TableCell>
                  <TableCell sx={{padding:1.2}} align="center">{row.PhoneNo}</TableCell>
                  <TableCell sx={{padding:1.2}} align="center">{row.CompanyName}</TableCell>
                  <TableCell sx={{padding:1.2}} align="center">{row.PlaceofSupply}</TableCell>
                  <TableCell sx={{padding:1.2}} align="center">{row.Receivables}</TableCell>
                  <TableCell sx={{padding:1.2}}align="center">
                    {!isMobile ? (
                      <>
                        <img
                          src={images.editicon}
                          alt="Edit Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            marginRight: "7px",
                            filter: "grayscale(100%) brightness(1.5%)",
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleEdit(row)}
                          onMouseEnter={(e) =>
                            (e.target.style.filter =
                              "grayscale(100%) brightness(1.5)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.filter = "grayscale(100%)")
                          }
                        />
                        <img
                          src={images.binicon}
                          alt="Bin Icon"
                          style={{
                            cursor: "pointer",
                            width: "22px",
                            height: "22px",
                            marginRight: "7px",
                            filter:
                              " invert(37%) sepia(83%) saturate(2155%) hue-rotate(331deg) brightness(99%) contrast(100%)",
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleDelete(row)}
                        />
                        <img
                          src={images.hiddenicon}
                          alt="Hidden Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            marginRight: "7px",
                          }}
                          onClick={() => handleHide(row)}
                        />
                      </>
                    ) : (
                      <IconButton // vertical dot icon image
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIcons(row.Name);
                        }}
                      >
                        <img
                          src={images.verticaldoticon}
                          alt="Vertical Dot Icon"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </IconButton>
                    )}

                    {isMobile && showIcons[row.Name] && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        marginLeft={1.2}
                        gap={2}
                        mt={1}
                      >
                        <img
                          src={images.editicon}
                          alt="Edit Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            filter: "grayscale(100%)", // initially gray
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleEdit(row)}
                          onMouseEnter={(e) =>
                            (e.target.style.filter =
                              "grayscale(100%) brightness(1.5)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.filter = "grayscale(100%)")
                          }
                        />
                        <img
                          src={images.binicon}
                          alt="Bin Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            filter:
                              " invert(37%) sepia(83%) saturate(2155%) hue-rotate(331deg) brightness(99%) contrast(100%)",
                            transition: "filter 0.3s ease",
                          }}
                          onClick={() => handleDelete(row)}
                        />
                        <img
                          src={images.hiddenicon}
                          alt="Hidden Icon"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
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

export default CustomerTable;
