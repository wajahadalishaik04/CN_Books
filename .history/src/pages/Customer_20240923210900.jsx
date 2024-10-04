import React from 'react'
import Button from '@mui/material/Button'
import { Box, styled  } from '@mui/material'
import Table from '../components/CustomerTable'
import { Link } from 'react-router-dom'
const Customer = () => {
  const StyledButton = styled(Button)({
    color:'white',
    backgroundColor:"#5BC4FA",
    fontSize:"1rem",
    textTransform:"none"
  })
  return (
   <>
   <Box marginTop={2} >
   <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center", paddingRight:"1.5rem"}}>
   <StyledButton variant="contained"component={Link} to={"/newcustomer"} sx={{}}>
     New
   </StyledButton>
   </Box>
   <Table/>
   </Box>
   </>
  )
}

export default Customer