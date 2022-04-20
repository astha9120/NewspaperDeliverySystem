import { Typography } from "@material-ui/core";
import Header from "./Header";
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TableSortLabel from '@mui/material/TableSortLabel';

import TableContainer from '@mui/material/TableContainer';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import GetOrder from './GetOrder'
import { useNavigate } from 'react-router-dom';



const axios = require("axios")

const useStyles = makeStyles({
   past:{
        paddingTop:"30px",
        paddingBottom:"20px"
   }
})


const PastOrders = ()=>{

    const classes = useStyles();
    const [orders,setOrders]= useState([{date:"",newspaper:[],bill:0,bill_status:0,o_id:-1}])
    const navigate = useNavigate();
    const id = localStorage.getItem('id')

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

     


    const getOrders = async()=>{
        const result = await axios.get(`http://localhost:4000/customer/pastorder/${id}`)
        console.log(result.data)
        setOrders(result.data)
    }
    
    useEffect(()=>{
        getOrders()
    },[])
  


    return(
        <div style={{minHeight:"100vh",backgroundColor:"#eae7dc"}}>
              <Header/>
        <Grid container component="main"  
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"  
          
          spacing={5} minHeight="100vh"
          marginTop="20px"
          
           > 
          
            
            
            <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}} >
            <Typography variant="h2" align="center"
        style={{ fontFamily: 'Playfair Display,serif',color:"#8e8d8a",marginBottom:"20px"}}>Past Orders</Typography>
            <Divider  sx={{ width: '20ch',marginTop:"27px",marginLeft:"42%",height:"3px",marginBottom:"10px",backgroundColor:"#8e8d8a"}} />
            
            <Paper sx={{ width: '1100px', overflow: 'hidden',marginTop:"80px", boxShadow:"5"}}>
            <TableContainer sx={{ maxHeight: 440}} >
            <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                    <TableRow >
                        <TableCell  sx={{backgroundColor:"#e98074",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"20px" ,textAlign:"center"}}
                                            >Date</TableCell>
                                            
                        <TableCell  sx={{backgroundColor:"#e98074",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"20px" ,textAlign:"center"}}>Duration</TableCell>
                        <TableCell  sx={{backgroundColor:"#e98074",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"20px" ,textAlign:"center"}}>Price</TableCell>
                        <TableCell  sx={{backgroundColor:"#e98074",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"20px" ,textAlign:"center"}}>Status</TableCell>
                        <TableCell  sx={{backgroundColor:"#e98074",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"20px" ,textAlign:"center"}}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor:"#C6F3BF"}}>
                    {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((e) => {
                        return(
                        <TableRow  hover role="checkbox" tabIndex={-1} key={e.o_id} >
                            <TableCell sx={{textAlign:"center" , fontFamily:'Nunito,sans-serif',fontSize:"16px",backgroundColor:"#eae7dc",color:"black"}} >{e.date.substring(0,10)}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontFamily:'Nunito,sans-serif',fontSize:"16px",backgroundColor:"#eae7dc",color:"black"}} >30</TableCell>
                            <TableCell sx={{textAlign:"center" , fontFamily:'Nunito,sans-serif',fontSize:"16px",backgroundColor:"#eae7dc",color:"black"}} >{e.bill}</TableCell>
                            <TableCell sx={{textAlign:"center" ,fontFamily:'Nunito,sans-serif',fontSize:"16px",backgroundColor:"#eae7dc",color:"black"}} >{e.bill_status==1 ? "Paid" : "Pending"}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontFamily:'Nunito,sans-serif',fontSize:"16px",backgroundColor:"#eae7dc",color:"white"}} >
                                <Button variant="contained"  sx={{backgroundColor:"#e85a4f", borderRadius:"18px"}} onClick={()=>{navigate(`/customer/order/${e.o_id}`)}}>View Details</Button>
                            </TableCell>
                        </TableRow>
                        
                    )})
                        }
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                                rowsPerPageOptions={[3, 10, 20]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
            />
             </Paper>     
             </Grid>   
             </Grid>       
        </div>
        
    )


};
export default PastOrders;