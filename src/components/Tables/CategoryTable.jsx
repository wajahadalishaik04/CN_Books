import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const CategoryTable = () => {
  const createData = (Name, Description, Status, CreatedBy, CreatedDate) => {
    return { Name, Description, Status, CreatedBy, CreatedDate };
  };

  const rows = [
    createData(
      "Roshan",
      "Hey This is Category Table  by which describes many kind of categories of products and its detailed information",
      "Working On It",
      "CodersNest.in",
      "24/08/2024"
    ),
    createData(
      "Roshan",
      "Mobile App Development",
      "Working On It",
      "CodersNest.in",
      "24/08/2024"
    ),
    createData(
      "Roshan",
      "Mobile App Development",
      "Working On It",
      "CodersNest.in",
      "24/08/2024"
    ),
    createData(
      "Roshan",
      "Mobile App Development",
      "Working On It",
      "CodersNest.in",
      "24/08/2024"
    ),
    // Additional rows...
  ];

  return (
    <>
      <Box
        sx={{
          margin: "0 22px",
          marginTop: 4,
          border: "1px solid #A7A7A7",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: { xs: "400px", md: "auto" },
            overflowX: "auto",
            boxShadow: "none",
          }}
        >
          <Table>
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  color: "white",
                  backgroundColor: "#6666FF",
                  padding:1.5
                },
              }}
            >
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "16px" },
                   
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    minWidth:100,
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  Created By
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "1px solid #EFEFEF",
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: { xs: "10px", md: "14px", padding:9.6 } }}
                  >
                    {row.Name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: { xs: "10px", md: "14px",padding:9.6,wordWrap:"break-word",whiteSpace:"normal",maxWidth:150 } }}
                  >
                    {row.Description}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: { xs: "10px", md: "14px",padding:9.6 } }}
                  >
                    {row.Status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: { xs: "10px", md: "14px",padding:9.6 } }}
                  >
                    {row.CreatedBy}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: { xs: "10px", md: "14px",padding:9.6 } }}
                  >
                    {row.CreatedDate}
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

export default CategoryTable;
