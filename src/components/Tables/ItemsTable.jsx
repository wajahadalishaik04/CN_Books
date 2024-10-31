import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";

// Sample data to populate the table
const rows = [
  {
    id: 1,
    name: "Alexa",
    purchaseDescription: "Alexa is an AI assistant voice control speaker that can perform tasks like playing music, providing weather updates, and more.",
    purchaseRate: "₹4000",
    description: "N/A",
    rate: "₹4999",
    hsnsac: "djhsd",
    usageUnit: "1yr",
  },
  // Add more rows if needed
];

const ItemsTable = () => {
  const StyledtableHeader = styled(TableCell)({
    fontSize: "0.9rem",
    padding: 12,
    fontWeight: 500,
  });
  const StyledtableCell = styled(TableCell)({
    fontSize: "0.88rem",
    padding: 9.6,
  });

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                backgroundColor: "#6666FF",
                color: "white",
              },
            }}
          >
            <TableRow sx={{ borderTop: "1px solid #EFEFEF" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all items" }}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "blue",
                    },
                  }}
                />
              </TableCell>
              <StyledtableHeader>NAME</StyledtableHeader>
              <StyledtableHeader sx={{ minWidth: 100 }}>PURCHASE DESCRIPTION</StyledtableHeader>
              <StyledtableHeader>PURCHASE RATE</StyledtableHeader>
              <StyledtableHeader>DESCRIPTION</StyledtableHeader>
              <StyledtableHeader>RATE</StyledtableHeader>
              <StyledtableHeader>HSN/SAC</StyledtableHeader>
              <StyledtableHeader>
                USAGE UNIT
                <IconButton
                  sx={{ marginLeft: 1, position: "relative", top: 1 }}
                >
                  <Search sx={{ color: "white" }} />
                </IconButton>
              </StyledtableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `checkbox-list-label-${row.id}`;

                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        sx={{
                          color: "gray",
                          "&.Mui-checked": {
                            color: "blue",
                          },
                        }}
                      />
                    </TableCell>
                    <StyledtableCell>{row.name}</StyledtableCell>
                    <StyledtableCell sx={{ maxWidth: 150, wordWrap: "break-word", whiteSpace: "normal" }}>
                      {row.purchaseDescription}
                    </StyledtableCell>
                    <StyledtableCell>{row.purchaseRate}</StyledtableCell>
                    <StyledtableCell>{row.description}</StyledtableCell>
                    <StyledtableCell>{row.rate}</StyledtableCell>
                    <StyledtableCell>{row.hsnsac}</StyledtableCell>
                    <StyledtableCell>{row.usageUnit}</StyledtableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ItemsTable;
