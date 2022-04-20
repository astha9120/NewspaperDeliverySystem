import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import { useState  , useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import TableSortLabel from '@mui/material/TableSortLabel';



const axios = require("axios");


const CustomerList = () => {

    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [quantity,setQuantity] = useState([{name:"",count:""}])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const [page2, setPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(10);

    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
      };
    
      const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(+event.target.value);
        setPage2(0);
      };



    useEffect(()=>{

            axios.get(`http://localhost:4000/ndb/customerlist/quantity/${id}`)
            .then(res=>{
              console.log(res.data)
              setQuantity(res.data)
            })
            axios.get(`http://localhost:4000/ndb/customerlist/${id}`)
            .then(res=>{
              console.log(res.data)
              if(res.data.length==0)
                setList(false)
              setCustomerlist(res.data)
            })
    },[])

    const submit = ()=>{
          Swal.fire({
            icon: 'success',
            title:'done',
            text: 'Sending notifications to all the customer',
            showConfirmButton: false,
            timer: 1500
        })
        axios.get(`http://localhost:4000/ndb/customerlist/send/${id}`)
        .then(res=>{
          console.log(res.data)
        })
    }

  return (
    <div style={{backgroundColor:"#e98074"}}>
    <Header/>
    <Grid container component="main"  
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"  
          spacing={5} minHeight="100vh"
          marginTop="20px" > 

          {list && 
          <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
           <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"20px",fontFamily:'Playfair Display,serif'}}>Newspaper List</Typography>
              <Divider  sx={{ width: '20ch',marginTop:"30px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
                  
              <Paper sx={{ width: '500px', overflow: 'hidden',marginTop:"50px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Newspaper</TableCell> 
                                            <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Quantity</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {quantity
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.count}</TableCell>
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={quantity.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
          </Grid> }

          {!list&&
            <Typography align="center" variant="h2" style={{paddingTop:"50px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
                No customer is allocated to you
                <Divider  sx={{ width: '20ch',marginTop:"30px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
            
          }
        {list &&  
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
           <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"28px",fontFamily:'Playfair Display,serif'}}>Customer Details</Typography>
            <Divider  sx={{ width: '35ch',marginLeft:"36%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
            <Paper sx={{ width: '1200px', overflow: 'hidden',marginTop:"80px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                          <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Name</TableCell> 
                                           <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>House no</TableCell> 
                                            <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Address</TableCell> 
                                            <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Newspapper</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {customerlist
                                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.c_id}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.address}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.area}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>
                                                  {row.newspaper.map((row1) => (
                                                  <Typography paddingBottom="2px" fontFamily='Nunito,sans-serif'>{row1} </Typography>
                                                  ))} 
                                                </TableCell>
                  
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 50]}
                                component="div"
                                count={customerlist.length}
                                rowsPerPage={rowsPerPage2}
                                page={page2}
                                onPageChange={handleChangePage2}
                                onRowsPerPageChange={handleChangeRowsPerPage2}
                            />
                        </Paper>
        </Grid>
           }
           {list &&
            <Button onClick={submit} paddingBottom="20px" 
            sx={{ width: '44ch',margin:"auto",marginTop:"20px",marginBottom:"20px"
            ,backgroundColor:"white",color:"#e98074"}}
            variant="contained">Send Notification to all</Button>
            }
          </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default CustomerList;
