import Header from './Header';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const axios = require("axios");


const Quantity = ()=>{

    const navigate = useNavigate();
    const [quantity,setQuantity] = useState([{}])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(false)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      useEffect(()=>{

        axios.get(`${process.env.REACT_APP_URL}/vendor/ndblist/quantity/${id}`)
        .then(res=>{
         // console.log(res.data)
          if(res.data.length>0)
            setList(true)
          setQuantity(res.data)
        }).catch(err=>navigate('/error'))
    },[])

    return(
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
                                          <TableRow hover role="checkbox" tabIndex={-1} key={row.n_id}>
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
            <Typography align="center" variant="h2" style={{paddingTop:"100px",paddingBottom:"20px",color:"white",fontFamily:'Playfair Display,serif'}}>
                No Orders for you 
                <Divider  sx={{ width: '20ch',marginTop:"30px",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
            
          }
        </Grid>
        </div>
    )
}

export default Quantity;