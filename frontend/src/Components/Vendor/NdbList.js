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
import TableSortLabel from '@mui/material/TableSortLabel';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


const axios = require("axios");

const useStyles = makeStyles({
   
  });


  function Row(props) {
    const { row } = props;
    console.log("row print")
    console.log(row)
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow hover role="checkbox" tabIndex={-1} key={row}>
          <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
          <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>
                                                     { row.total_p}
            </TableCell> 
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" fontFamily='Playfair Display,serif'>
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                    <TableCell sx={{fontFamily:'Playfair Display,serif',color:"black",fontSize:"16px",
                    textAlign:"center"}}>Newspaper</TableCell>                       
                    <TableCell sx={{fontFamily:'Playfair Display,serif',color:"black",fontSize:"16px",
                    textAlign:"center"}}>Quantity</TableCell> 
                     <TableCell sx={{fontFamily:'Playfair Display,serif',color:"black",fontSize:"16px",
                    textAlign:"center"}}>Amount($)</TableCell> 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.newspaper.map((row1) => (
                      <TableRow>
                          <TableCell sx={{fontFamily:'Nunito,sans-serif',textAlign:"center"}}>{row1.name}
                          </TableCell>
                          <TableCell sx={{fontFamily:'Nunito,sans-serif',textAlign:"center"}}>{row1.count}
                          </TableCell>
                          <TableCell sx={{fontFamily:'Nunito,sans-serif',textAlign:"center"}}>{row1.price}
                          </TableCell>
                       
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  


const NdbList = () => {

    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(false)
    const [charge,setCharge] = useState(0)

    const [filter,setFilter] = useState("");

    const handleSearch = (e)=>{
        console.log(e.target.value);
        setFilter(e.target.value);
    }

    const [orderDirection,setOrderDirection]=useState('asc')
    const [valueToOrderBy,setValueToOrderBy] = useState("name")

    
    const [page2, setPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(5);

    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
      };
    
      const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(event.target.value);
        setPage2(0);
      };

      
    const handleRequestSort = (event,property)=>{
      const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
      setValueToOrderBy(property)
      setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  const createSortHandler = (property) => (event) =>{
      handleRequestSort(event,property)
  }

  function descendingComparator(a,b,orderBy){
      if(b[orderBy]<a[orderBy])
          return -1;
      if(b[orderBy]>a[orderBy])
          return 1;
      return 0;
  }

  function getComparator(order,orderBy){
      return order === 'desc' 
      ? (a,b) => descendingComparator(a,b,orderBy)
      : (a,b) => -descendingComparator(a,b,orderBy)
  }

  const sortedRowInformation = (rowArray , comparator) =>{
      const stabilizedRowArray = rowArray.map((el,index)=>[el,index])
      stabilizedRowArray.sort((a,b)=>{
          const order = comparator(a[0],b[0])
          if(order!==0) return order
          return a[1]-b[1]
      })
      return stabilizedRowArray.map((el)=>el[0])
  }


    useEffect(()=>{

            axios.get(`${process.env.REACT_APP_URL}/vendor/ndblist/${id}`)
            .then(res=>{
              console.log(res.data)
              if(res.data.length>0)
                setList(true)
              setCustomerlist(res.data)
            })

            axios.get(`${process.env.REACT_APP_URL}/vendor/ndblist/charge/${id}`)
            .then(res=> {
              console.log(res.data)
              setCharge(res.data[0].charge)
            })
        
    },[])


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
                <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"28px",fontFamily:'Playfair Display,serif'}}>Delivery Person Details</Typography>
                <Divider  sx={{ width: '35ch',marginLeft:"36%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
                <TextField
                  placeholder="Search your customer"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  style={{marginTop:"50px",width:"30%",backgroundColor:"white",borderRadius:"5px"}}
                />
                <Paper sx={{ width: '1100px', overflow: 'hidden',marginTop:"80px"}}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead >
                                            <TableRow >
                                              <TableCell key ="name" sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                                fontSize:"24px" ,textAlign:"center"}}>
                                                  <TableSortLabel active={valueToOrderBy==="name"}
                                                    direction = {valueToOrderBy==="name" ? orderDirection : 'asc'} onClick ={createSortHandler("name")}
                                                  >Name</TableSortLabel>
                                              </TableCell> 
                                        
                                              
                                              <TableCell key="total_p" sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                                                    fontSize:"24px" ,textAlign:"center"}}>
                                                    <TableSortLabel active={valueToOrderBy==="total_p"}
                                                    direction = {valueToOrderBy==="total_p" ? orderDirection : 'asc'} onClick ={createSortHandler("total_p")}
                                                    >Total price ($)
                                                    </TableSortLabel>
                                              </TableCell> 
                                              <TableCell  sx={{backgroundColor:"#eae7dc"}} />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {sortedRowInformation(customerlist,getComparator(orderDirection,valueToOrderBy))
                                            .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                            .map((row,index) => {
                                              if(row.name.toLowerCase().includes(filter.toLowerCase())===true){
                                                return (
                                                  <Row key={index} row={row} />
                                                  )}
                                            })
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
         

          {!list&&
            <Typography align="center" variant="h2" style={{paddingTop:"100px",paddingBottom:"20px",color:"white",fontFamily:'Playfair Display,serif'}}>
                No Ndb is allocated to you
                <Divider  sx={{ width: '20ch',marginTop:"30px",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
            
          }

  
        
          </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default NdbList;
