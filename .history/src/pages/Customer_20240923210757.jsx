import React from 'react'
import Button from '@mui/material/Button'
import { Box  } from '@mui/material'
import Table from '../components/CustomerTable'
import { Link } from 'react-router-dom'
const Customer = () => {
  const StyledButton = sty
  return (
   <>
   <Box marginTop={2} >
   <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center", paddingRight:"1.5rem"}}>
   <Button variant="contained"component={Link} to={"/newcustomer"} sx={{color:'white',backgroundColor:"#5BC4FA"}}>
     New
   </Button>
   </Box>
   <Table/>
   </Box>
   </>
  )
}

export default Customer