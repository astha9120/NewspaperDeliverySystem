import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
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
import Swal from 'sweetalert2';

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



const Vendorlist = () => {

    const classes = useStyles();
    const [vendorlist,setVendorlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const navigate = useNavigate();

    useEffect(()=>{

            
            axios.get(`http://localhost:4000/admin/vendorlist`)
            .then(res=>{
              console.log(res.data)
              if(res.data.length==0)
                setList(false)
              setVendorlist(res.data)
            })

        
    },[])

    const update = (e)=>{
        e.preventDefault()
        navigate('/admin/updatendb')
    }

    const change = async(param)=>{
        
        console.log("HERE");
        const result = await axios.put(`http://localhost:4000/admin/vendorlist/${param}`)
        console.log(result.data)
        if(result.data==="yess"){
                Swal.fire({
                  icon: 'success',
                  title:'done',
                  text: 'Successfully Done',
                  showConfirmButton: false,
                  timer: 1500
            })
            window.location.reload(true)
              
              
        }
        
       else{ 
           Swal.fire({
            icon: 'error',
            title:'Sorry',
            text: 'Error',
            showConfirmButton: false,
            timer:   1500
      })
      navigate(`/admin/vendorlist`);
    }
    }

    

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

          

          {!list&&
            <Typography align="center" variant="h5" style={{paddingTop:"50px",paddingBottom:"20px"}}>
                No vendor is listed till now.
            </Typography>
          }
          
        {list &&  
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
            <Typography variant="h4" align="center" sx={{color:"#B939A4",marginBottom:"28px"}}>Vendor List:</Typography>
            <TableContainer component={Paper} sx={{width:1435 , margin:"auto"}}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="center">Phone No</StyledTableCell>
                    <StyledTableCell align="center">Charge</StyledTableCell>
                     <StyledTableCell align='center'>Options</StyledTableCell>
                    {/* <StyledTableCell align="center">Address</StyledTableCell>
                   
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell> */}
                    
                  </TableRow>
                </TableHead>
            
                <TableBody>
                  {vendorlist.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="center" component="th" scope="row" onClick={update}>
                        {row.name}
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">{`${row.address}  ${row.area}  ${row.city} ${row.state}`}</StyledTableCell>
                      <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
                      <StyledTableCell align="center">{row.charge}</StyledTableCell>
                      <StyledTableCell align="center">
                         
                          <span><Button  sx= {{marginLeft:"20%",marginTop:"5px"}} type="submit" 
                                variant="outlined" disabled={row.accept} onClick={()=>change(row.v_id)}>
                               Accept
                            </Button>
                            <Button  sx= {{marginLeft:"20%",marginTop:"5px"}} type="submit" 
                                variant="outlined">
                               Delete
                            </Button></span>
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">{row.area}</StyledTableCell>
                      <StyledTableCell align="right">{row.city}</StyledTableCell>
                      <StyledTableCell align="right">{row.state}</StyledTableCell> */}
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

export default Vendorlist;
