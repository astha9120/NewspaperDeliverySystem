import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

const axios = require("axios");

const useStyles = makeStyles({
   root:{
    fontFamily : "Roboto"
   }
  });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2148C0',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: "#CCCFFB"
    },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const CustomerList = () => {

    const classes = useStyles();
    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [allocate,setAllocate] = useState(true)

    useEffect(()=>{
            axios.get(`http://localhost:4000/ndb/customerlist/${id}`)
            .then(res=>{
              console.log(res.data)
              if(res.data.length==0)
                setList(false)
              setCustomerlist(res.data)
            })

        
    },[])


  return (
    <div>
    <Header/>
    <Grid container component="main"  
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"  
          className={classes.root}
          spacing={9} minHeight="100vh"
          marginTop="20px" > 
           
          
        {/* <Grid item lg={6} md={2} xs={1} sx={{marginTop:"50px"}}> */}
          {!list&&
            <Typography align="center" variant="h5" style={{paddingTop:"50px",paddingBottom:"20px"}}>
                No Customer is allocated to you
            </Typography>
          }
          {list &&
            
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
            <Typography variant="h4" align="center" sx={{color:"#B939A4",marginBottom:"28px"}}>Customer Information:</Typography>
            <TableContainer component={Paper} sx={{width:1435 , margin:"auto"}}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="right">Area</StyledTableCell>
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
            
                <TableBody>
                  {customerlist.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.address}</StyledTableCell>
                      <StyledTableCell align="right">{row.area}</StyledTableCell>
                      <StyledTableCell align="right">{row.city}</StyledTableCell>
                      <StyledTableCell align="right">{row.state}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Grid>
           }
          </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default CustomerList;
