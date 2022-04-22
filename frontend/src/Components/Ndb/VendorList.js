import Header from './Header';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


const axios = require("axios");

const useStyles = makeStyles({
  main:{
    textAlign:"center",
    minHeight:"100vh",
    fontFamily:'Playfair Display,serif',
    backgroundColor:"#e98074"
},
   
  });



const VendorList = () => {

    const classes = useStyles();
    const [obj,setObj]=useState({name:"",phoneno:"",address:"",area:""})
    const [newspaper,setNewspaper] = useState([])
    const [vendorlist,setVendorlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const [allocate,setAllocate] = useState(true)

    const [filter,setFilter] = useState("");

    const handleSearch = (e)=>{
        console.log(e.target.value);
        setFilter(e.target.value);
    }

    
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
            axios.get(`http://localhost:4000/ndb/vendorlist/${id}`)
            .then(res=>{
              //console.log(res.data)
              if(res.data.length==0)
                setList(false)
              setVendorlist(res.data)
            })


            axios.get(`http://localhost:4000/ndb/vendorlist/quantity/${id}`)
            .then(res=>{
              setNewspaper(res.data)
            })
            axios.get(`http://localhost:4000/ndb/vendorlist/allocate/${id}`)
            .then(res=>{
              if(res.data.length==0)
                setAllocate(false)
              //console.log(res.data[0])
              setObj(res.data[0])
            })
    },[])


  return (
    <div className={classes.main}>    
    <Header/>
  
    <Grid container component="main"  
          direction="column" 
          justifyContent="space-evenly"
          alignItems="center"  
          className={classes.root}
          spacing={5} minHeight="100vh" > 
          
        <Grid item lg={6} md={2} xs={1} sx={{marginTop:"60px"}}>
          {!allocate&&
             <Typography align="center" variant="h2" style={{paddingTop:"50px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
                No vendor is allocated to you
             <Divider  sx={{ width: '20ch',marginTop:"30px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
          }
          {allocate &&
            <Grid container justifyContent="space-evenly" spacing={4}>

               <Grid item lg={6} md={4} xs={2} >
                  <Card sx={{ width: 500, height:400 ,backgroundColor:"#d8c3a5",marginTop:"80px"}}>
                      <CardContent>
                        <Typography variant="h3" color="white" sx={{fontFamily:'Playfair Display,serif'}} gutterBottom>
                          Vendor's information
                        </Typography>
                        <Divider  sx={{ width: '20ch',marginTop:"30px",marginLeft:"29%",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
                        <Typography fontSize="20px"  marginTop="60px" color="black" align="left"  sx={{fontFamily: 'Nunito,sans-serif'}}>
                          Name : {obj.name}
                        </Typography>
                        <Typography fontSize="20px" align="left" color="black" marginTop="10px" sx={{fontFamily: 'Nunito,sans-serif'}}>
                          Phone number : {obj.phoneno}
                        </Typography>
                        <Typography  fontSize="20px" align="left" color="black" marginTop="10px" sx={{fontFamily: 'Nunito,sans-serif'}}>
                          Address : {obj.address} {obj.area}
                        </Typography>
                      </CardContent>
                    </Card>
                </Grid> 
                <Grid item lg={6} md={4} xs={2}>
                      <Paper sx={{ width: '500px', overflow: 'hidden',marginTop:"80px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Newspaper</TableCell> 
                                            <TableCell sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>quantity</TableCell> 
                                            <TableCell sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Amount</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {newspaper
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.n_id}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.count}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.price}</TableCell>
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={newspaper.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                  </Grid>
           </Grid>}
          </Grid>
        
        
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"60px",marginBottom:"40px"}}>
        <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"28px",fontFamily:'Playfair Display,serif'}}>Other Vendor's Details</Typography>
            {/* <Divider  sx={{ width: '35ch',marginLeft:"36%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} /> */}
            <TextField
              placeholder="Search your customer"
              inputProps={{ 'aria-label': 'search' }}
              variant="filled"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{marginTop:"50px",width:"30%",marginRight:"70%"}}
            />
            <Paper sx={{ width: '1200px', overflow: 'hidden',marginTop:"80px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                          <TableCell sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Name</TableCell> 
                                           <TableCell  sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Phone number</TableCell> 
                                            <TableCell  sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>House number</TableCell> 
                                            <TableCell  sx={{backgroundColor:"#d8c3a5",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Address</TableCell> 
                                             
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {vendorlist
                                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                        .map((row) => {
                                          if(row.name.includes(filter)===true || row.phoneno.includes(filter)===true || 
                                            row.address.includes(filter)===true || row.area.includes(filter)===true)
                                            {
                                              return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.n_id}>
                                                    <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                    <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.phoneno}</TableCell>
                                                    <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.address}</TableCell>
                                                    <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.area}</TableCell>
                                                    
                                                </TableRow>)
                                            }

                                        })
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={vendorlist.length}
                                rowsPerPage={rowsPerPage2}
                                page={page2}
                                onPageChange={handleChangePage2}
                                onRowsPerPageChange={handleChangeRowsPerPage2}
                            />
                        </Paper>
      </Grid>
    </Grid>
    </div>
    
  );
}

export default VendorList;
