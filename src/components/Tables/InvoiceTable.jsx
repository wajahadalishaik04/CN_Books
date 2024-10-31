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
  Typography,
  Toolbar,
} from "@mui/material";
import styled from "@emotion/styled";

// Sample data to populate the table
const rows = [
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
  {
    id: 2,
    date: "01/10/2024",
    invoiceNo: "INV-000010",
    customer: "Jyffit Technologies Services LLC",
    status: "OVERDUE BY 7 DAYS",
    dueDate: "02/10/2024",
    amount: 55065,
    balanceDue: 55065,
  },
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
  {
    id: 2,
    date: "01/10/2024",
    invoiceNo: "INV-000010",
    customer: "Jyffit Technologies Services LLC",
    status: "OVERDUE BY 7 DAYS",
    dueDate: "02/10/2024",
    amount: 55065,
    balanceDue: 55065,
  },
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
  {
    id: 2,
    date: "01/10/2024",
    invoiceNo: "INV-000010",
    customer: "Jyffit Technologies Services LLC",
    status: "OVERDUE BY 7 DAYS",
    dueDate: "02/10/2024",
    amount: 55065,
    balanceDue: 55065,
  },
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
  {
    id: 2,
    date: "01/10/2024",
    invoiceNo: "INV-000010",
    customer: "Jyffit Technologies Services LLC",
    status: "OVERDUE BY 7 DAYS",
    dueDate: "02/10/2024",
    amount: 55065,
    balanceDue: 55065,
  },
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
  {
    id: 2,
    date: "01/10/2024",
    invoiceNo: "INV-000010",
    customer: "Jyffit Technologies Services LLC",
    status: "OVERDUE BY 7 DAYS",
    dueDate: "02/10/2024",
    amount: 55065,
    balanceDue: 55065,
  },
  {
    id: 1,
    date: "02/10/2024",
    invoiceNo: "INV-000011",
    customer: "WSPACESAI LABS PRIVATE LIMITED",
    status: "OVERDUE BY 6 DAYS",
    dueDate: "03/10/2024",
    amount: 47200,
    balanceDue: 47200,
  },
];

const InvoiceTable = () => {
  // custom table header
  const StyledtableHeader = styled(TableCell)({
    fontSize: "0.99rem",
    fontWeight: 500,
  });
  // custom table cell
  const StyledtableCell = styled(TableCell)({
    fontSize: "0.84rem",
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
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow sx={{ borderTop: "1px solid #EFEFEF" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all invoices" }}
                />
              </TableCell>
              <StyledtableHeader>Date</StyledtableHeader>
              <StyledtableHeader>Invoice #</StyledtableHeader>
              <StyledtableHeader>Customer</StyledtableHeader>
              <StyledtableHeader>Status</StyledtableHeader>
              <StyledtableHeader>Due Date</StyledtableHeader>
              <StyledtableHeader>Amount</StyledtableHeader>
              <StyledtableHeader>Balance Due</StyledtableHeader>
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
                      />
                    </TableCell>
                    <StyledtableCell>{row.date}</StyledtableCell>
                    <StyledtableCell>{row.invoiceNo}</StyledtableCell>
                    <StyledtableCell>{row.customer}</StyledtableCell>
                    <StyledtableCell>{row.status}</StyledtableCell>
                    <StyledtableCell>{row.dueDate}</StyledtableCell>
                    <StyledtableCell>{row.amount}</StyledtableCell>
                    <StyledtableCell>{row.balanceDue}</StyledtableCell>
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
export default InvoiceTable;
