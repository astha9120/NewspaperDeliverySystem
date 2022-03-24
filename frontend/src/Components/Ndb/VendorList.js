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



const VendorList = () => {

    const classes = useStyles();
    const [obj,setObj]=useState({name:"",phoneno:"",address:"",area:""})
    const [newspaper,setNewspaper] = useState([{name:"divya Bhaskar",quantity:80,price:2000},
                                      {name:"Gujarat Samachar",quantity:20,price:1000},
                                      {name:"Times of India",quantity:80,price:1100},
                                      {name:"mint",quantity:80,price:900}])
    const [vendorlist,setVendorlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [allocate,setAllocate] = useState(true)

    useEffect(()=>{
            axios.get(`http://localhost:4000/ndb/vendorlist/${id}`)
            .then(res=>{
              console.log(res.data)
              if(res.data.length==0)
                setList(false)
              setVendorlist(res.data)
            })

            axios.get(`http://localhost:4000/ndb/vendorlist/allocate/${id}`)
            .then(res=>{
              if(res.data.length==0)
                setAllocate(false)
              console.log(res.data[0])
              setObj(res.data[0])
            })
    },[])


  return (
    <div>
    <Header/>
    <Grid container component="main"  
          direction="column" 
          justifyContent="space-evenly"
          alignItems="center"  
          className={classes.root}
          spacing={5} minHeight="100vh" > 
          
        <Grid item lg={6} md={2} xs={1} sx={{marginTop:"50px"}}>
          {!allocate&&
            <Typography align="center" variant="h5" style={{paddingTop:"50px",paddingBottom:"20px"}}>
                No vendor is allocated to you
            </Typography>
          }
          {allocate &&
            <Grid container justifyContent="space-evenly">
               <Grid item lg={6} md={4} xs={2} backgroundColor="#CCCFFB">
                  <Typography variant="h5" align="center" sx={{color:"white",padding:"5px",backgroundColor:"#2148C0"}}>Vendor's Info:</Typography>
                    <Typography sx={{marginLeft:"40px",marginTop:"50px"}}>Name: {obj.name}</Typography>
                    <Typography sx={{marginLeft:"40px",marginTop:"5px"}}>Phone number:{obj.phoneno}</Typography>
                   <Typography sx={{marginLeft:"40px",marginTop:"5px"}}>Address:{obj.address} {obj.area}</Typography>
                </Grid> 
                <Grid item lg={6} md={4} xs={2}>
                    <Typography variant="h5" align="center"sx={{color:"white",padding:"5px",backgroundColor:"#2148C0"}}>Quantity List:</Typography>
                    <Table aria-label="simple table" style={{ width: "100%"  }} sx={{margin:"auto" }} border="1">
                            <TableHead>
                                    <TableRow>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Newspaper</TableCell>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Quantity</TableCell>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Price</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {newspaper.map((e) => (
                                <TableRow key={e.name}>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.name}</TableCell>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.quantity}</TableCell>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.price}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                  </Grid>
           </Grid>}
          </Grid>
        
        
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"20px",marginBottom:"40px"}}>
            <Typography variant="h5" align="center" sx={{color:"#B939A4",marginBottom:"10px"}}>List of other vendors:</Typography>
            <TableContainer component={Paper} sx={{width:1200 , margin:"auto"}}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Phone Number</StyledTableCell>
                    <StyledTableCell align="right">Address</StyledTableCell>
                    <StyledTableCell align="right">Area</StyledTableCell>
                  </TableRow>
                </TableHead>
            
                <TableBody>
                  {vendorlist.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.phoneno}</StyledTableCell>
                      <StyledTableCell align="right">{row.address}</StyledTableCell>
                      <StyledTableCell align="right">{row.area}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Grid>
    </Grid>
    </div>
    
  );
}

export default VendorList;
