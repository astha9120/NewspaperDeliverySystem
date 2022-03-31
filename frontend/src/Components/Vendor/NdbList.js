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



const NdbList = () => {

    const classes = useStyles();
    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [allocate,setAllocate] = useState(true)
    const [quantity,setQuantity] = useState([{}])


    useEffect(()=>{

            axios.get(`http://localhost:4000/vendor/ndblist/quantity/${id}`)
            .then(res=>{
              console.log(res.data)
              setQuantity(res.data)
            })

            axios.get(`http://localhost:4000/vendor/ndblist/${id}`)
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
          spacing={5} minHeight="100vh"
          marginTop="20px" > 
          
          {list && 
          <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
          <Typography variant="h4" align="center" sx={{color:"#B939A4",marginBottom:"20px"}}>Newspaper List</Typography>
            <TableContainer component={Paper} sx={{width:500, margin:"auto"}}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>               
                  </TableRow>
                </TableHead>
            
                <TableBody>
                  {quantity.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.count}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> }

          {!list&&
            <Typography align="center" variant="h5" style={{paddingTop:"50px",paddingBottom:"20px"}}>
                No Ndb is allocated to you
            </Typography>
          }
          {list &&
            
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
            <Typography variant="h4" align="center" sx={{color:"#B939A4",marginBottom:"28px"}}>Newspaper Deliveryperson Details</Typography>
            <TableContainer component={Paper} sx={{width:1435 , margin:"auto"}}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell> 
                    <StyledTableCell align="center">Newspaper</StyledTableCell>                  
                    <StyledTableCell align="center">Quantity</StyledTableCell> 
                  </TableRow>
                </TableHead>
            
                <TableBody>
                  {customerlist.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.name}
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">                 
                          {row.newspaper.map((row1) => (
                            <Typography paddingBottom="2px">{row1.name} </Typography>
                          ))} 
                      </StyledTableCell>

                      <StyledTableCell align="center">               
                          {row.newspaper.map((row1) => (
                            <Typography paddingBottom="2px">{row1.count} </Typography>
                          ))} 
                      </StyledTableCell>

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

export default NdbList;
