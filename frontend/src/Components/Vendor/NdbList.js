import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';

const axios = require("axios");

const useStyles = makeStyles({
   root:{
    fontFamily : "Roboto"
   }
  });

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#2148C0',
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(even)': {
//     backgroundColor: "#CCCFFB"
//     },

//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));



const NdbList = () => {

    const classes = useStyles();
    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [allocate,setAllocate] = useState(true)
    const [quantity,setQuantity] = useState([{}])

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
    const [rowsPerPage2, setRowsPerPage2] = useState(5);

    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
      };
    
      const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(+event.target.value);
        setPage2(0);
      };


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
    <div style={{backgroundColor:"#e98074"}}>
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
              <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"20px",fontFamily:'Playfair Display,serif'}}>Newspaper List</Typography>
              <Divider  sx={{ width: '20ch',marginTop:"15px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
                  
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
            <Typography align="center" variant="h2" style={{paddingTop:"50px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
                No Ndb is allocated to you
                <Divider  sx={{ width: '20ch',marginTop:"15px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
            </Typography>
            
          }
          {list &&
            
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
            <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"28px",fontFamily:'Playfair Display,serif'}}>Delivery Person Details</Typography>
            <Divider  sx={{ width: '35ch',marginTop:"15px",marginLeft:"36%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
            <Paper sx={{ width: '1200px', overflow: 'hidden',marginTop:"80px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                          <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Name</TableCell> 
                                           <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Newspaper</TableCell> 
                                            <TableCell sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                            fontSize:"22px" ,textAlign:"center"}}>Quantity</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {customerlist
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.n_id}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>
                                                  {row.newspaper.map((row1) => (
                                                  <Typography paddingBottom="2px" fontFamily='Nunito,sans-serif'>{row1.name} </Typography>
                                                  ))} 
                                                </TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>
                                                  {row.newspaper.map((row1) => (
                                                    <Typography paddingBottom="2px" fontFamily='Nunito,sans-serif'>{row1.count} </Typography>
                                                  ))} 
                                                </TableCell>  
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
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
          </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default NdbList;
