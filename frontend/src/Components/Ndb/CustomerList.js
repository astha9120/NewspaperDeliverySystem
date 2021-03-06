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
import { useNavigate } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import TableSortLabel from '@mui/material/TableSortLabel';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';





const axios = require("axios");

const StyledButton = styled(Button)({
  '&:hover': {
      backgroundColor: '#e85a4f',
      boxShadow: '20',
      width: '44ch'
    }
})


const CustomerList = () => {

    const navigate = useNavigate();

    const [customerlist,setCustomerlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    
    
    const [orderDirection,setOrderDirection]=useState('asc')
    const [valueToOrderBy,setValueToOrderBy] = useState("name")


    const [selected, setSelected] = React.useState([]);

    
    const isSelected = (name) => selected.indexOf(name) !== -1;

  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = customerlist.map((n) => n.c_id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };



    const [filter,setFilter] = useState("");

    const handleSearch = (e)=>{
        setFilter(e.target.value);
    }
      


    const [page2, setPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(10);

    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
      };
    
      const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(+event.target.value);
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
            axios.get(`${process.env.REACT_APP_URL}/ndb/customerlist/${id}`)
            .then(res=>{
              if(res.data.length==0)
                setList(false)
              setCustomerlist(res.data)
            }).catch(err=>navigate('/error'))
    },[])

    const submit = async()=>{
          Swal.fire({
            icon: 'success',
            title:'done',
            text: 'Sending notifications to all the customer',
            showConfirmButton: false,
            timer: 1500
        })

        try {
          console.log(selected);
          const result = await axios.post(`${process.env.REACT_APP_URL}/ndb/customerlist/send/${id}`,{
            
            list : selected
           })
           console.log(result)
        } catch (error) {
          navigate('/error')
        }
        


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

         
          {!list&&
            <Typography align="center" variant="h2" style={{paddingTop:"100px",paddingBottom:"20px",color:"white",fontFamily:'Playfair Display,serif'}}>
                No customer is allocated to you
                <Divider  sx={{ width: '30ch',marginTop:"30px",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
            
          }
         
        {list &&  
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
           <Typography variant="h2" align="center" sx={{color:"white",marginBottom:"28px",fontFamily:'Playfair Display,serif'}}>Customer Details</Typography>
            <Divider  sx={{ width: '35ch',marginLeft:"36%",height:"3px",marginBottom:"10px",backgroundColor:"white",marginTop:"30px"}} />
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
              style={{marginTop:"50px",width:"30%"}}
            />
            <Paper sx={{ width: '1200px', overflow: 'hidden',marginTop:"80px"}}>
                
            
        <TableContainer sx={{maxHeight:440}}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell padding="checkbox" sx={{backgroundColor:"#eae7dc"}}>
                          <Checkbox
                            color="primary"
                            
                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                            //checked={customerlist.length > 0 && selected.length === customerlist.length}
                            onChange={handleSelectAllClick}
    
                          />
                        </TableCell>
                        <TableCell key="name"  sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                            fontSize:"22px" ,textAlign:"center"}}>
                            <TableSortLabel active={valueToOrderBy==="name"}
                             direction = {valueToOrderBy==="name" ? orderDirection : 'asc'} onClick ={createSortHandler("name")}
                            >Name</TableSortLabel>
                        </TableCell>
                        <TableCell key="address"  sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                            fontSize:"22px" ,textAlign:"center"}}>
                            <TableSortLabel active={valueToOrderBy==="address"} 
                             direction = {valueToOrderBy==="address" ? orderDirection : 'asc'} onClick ={createSortHandler("address")}
                             >House no
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="area"  sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                            fontSize:"22px" ,textAlign:"center"}}>
                            <TableSortLabel active={valueToOrderBy==="area"} 
                             direction = {valueToOrderBy==="area" ? orderDirection : 'asc'} onClick ={createSortHandler("area")}
                            >Address
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="newspaper"  sx={{backgroundColor:"#eae7dc",fontFamily:'Playfair Display,serif',color:"black",
                        fontSize:"22px" ,textAlign:"center"}}>
                                Newspaper
                        </TableCell>
                    </TableRow>
                </TableHead>

                {
                    sortedRowInformation(customerlist,getComparator(orderDirection,valueToOrderBy))
                    .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                    .map((person,index)=>{
                        const isItemSelected = isSelected(person.c_id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        if(person.name.toLowerCase().includes(filter.toLowerCase())===true || person.address.toLowerCase().includes(filter.toLowerCase())===true ||
                         person.area.toLowerCase().includes(filter.toLowerCase())===true) 
                        {
                            return (
                                <TableRow hover
                                onClick={(event) => handleClick(event, person.c_id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={person.c_id}
                                selected={isItemSelected}>
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                   </TableCell>
                                <TableCell  sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{person.name}</TableCell>
                                <TableCell  sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{person.address}</TableCell>
                                <TableCell  sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{person.area}</TableCell>
                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>
                                    {person.newspaper.map((row1) => (
                                            <Typography paddingBottom="2px" fontFamily='Nunito,sans-serif'>{row1} </Typography>
                                    ))} 
                                </TableCell>
                            </TableRow>
                            )
                        }
                        return null;
                    })
                }
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
            <StyledButton onClick={submit} paddingBottom="20px" 
            variant="contained"
            sx={{ width: '44ch',margin:"auto"
            ,backgroundColor:"white",color:"black",marginBottom:"30px"}}
            >Send Notification to all</StyledButton>
            }
          </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default CustomerList;
