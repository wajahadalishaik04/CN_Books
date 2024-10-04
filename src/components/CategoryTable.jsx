import { Box, Paper, Table, TableBody, TableCell,  TableContainer,  TableHead, TableRow } from '@mui/material';
import React from 'react';

const CategoryTable = () => {
  const createData = (Name, Description, Status, CreatedBy, CreatedDate) => {
    return { Name, Description, Status, CreatedBy, CreatedDate };
  };

  const rows = [
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    createData('Roshan', 'Mobile App Development', 'Working On It', "CodersNest.in", "24/08/2024"),
    
  ];

  return (
    <>
      <Box  sx={{ margin:"0 22px",marginTop: 4, border:"1px solid #A7A7A7",borderRadius: "10px", overflow:"hidden" }}>
      <TableContainer   component={Paper} sx={{ maxHeight: { xs: '400px', md: 'auto' }, overflowX: 'auto' }}>
      <Table >
          <TableHead sx={{ backgroundColor: "#D6F1FF",  }}>
            <TableRow >
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created By</TableCell>
              <TableCell align="center">Created Date</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.Name}
                sx={{ '&:last-child td, &:last-child th': { borderBottom: "1px solid #EFEFEF" } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="center">{row.Description}</TableCell>
                <TableCell align="center">{row.Status}</TableCell>
                <TableCell align="center">{row.CreatedBy}</TableCell>
                <TableCell align="center">{row.CreatedDate}</TableCell>
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
