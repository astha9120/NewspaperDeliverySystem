import { Typography } from "@material-ui/core";
import Header from "./Header";
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';


const axios = require("axios")

const useStyles = makeStyles({
    bill:{
        textAlign:"center",
        paddingTop:"40px",
        paddingBottom:"30px",
        color:"#e85a4f"
    }
})

const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
      }
  })


const  BillCollection=()=>{
    const classes = useStyles();
    const navigate = useNavigate();
    const [bill,setBill]= useState([{}])
    const [billCollected,setBillCollected]=useState([{}])
    const id = localStorage.getItem('id')
    const [bool_bill,setBool_bill] = useState(false)
    const [bool_bill_p,setBool_bill_p] = useState(false)

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

    const [orderDirection,setOrderDirection]=useState('asc')
    const [valueToOrderBy,setValueToOrderBy] = useState("name")

    const [orderDirection2,setOrderDirection2]=useState('asc')
    const [valueToOrderBy2,setValueToOrderBy2] = useState("name")

    const handleRequestSort2 = (event,property)=>{
        const isAscending = (valueToOrderBy2 === property && orderDirection2 === 'asc')
        setValueToOrderBy2(property)
        setOrderDirection2(isAscending ? 'desc' : 'asc')
    }

    const createSortHandler2 = (property) => (event) =>{
        handleRequestSort2(event,property)
    }
  

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

    const getBills=async()=>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/ndb/billcollection/${id}`)
            console.log("yet to be collected")
            if(result.data.length!=0){
                setBill(result.data)
                setBool_bill_p(true)
                console.log(bill)
    
            }
        } catch (error) {
            navigate('/error')
        }
       

    }

    const collect = o_id => async(e)=>{

        const willDelete = await Swal.fire({
            icon: 'success',
            title:'Are you sure?',
            text: "You won't be able to revert this",
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, collect it!',
            timer: 15000
        }).then((result)=>{
                if (result.isConfirmed){
                    Swal.fire(
                    'Collected!',
                    'Bill has been collected.',
                    'success'
                    )

                axios.put(`${process.env.REACT_APP_URL}/ndb/billcollection/${o_id}`)
                .then(res=>{
                    console.log("collect button click")
                    console.log(res.data)
                }).error(err=> navigate('/error'))
            }   
        })
      
        
        window.location.reload(true)
    }

    const bill_collected = async()=>{
        let  date = new Date()
        const month = date.getMonth();
        date.setMonth(month-1)
        date = date.toJSON().slice(0,10).replace(/-/g,'-')

        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/ndb/billcollection/${id}/${date}`)
            console.log("collected bill")
            console.log(result.data.length)
            if(result.data.length!=0){
                setBillCollected(result.data)
                setBool_bill(true)
                console.log("hello there")
                console.log(billCollected)
            }
              
        } catch (error) {
            navigate('/error')
        }
        

    }

    useEffect(()=>{
        getBills()
        bill_collected()
    },[])


    return(
        <div style={{minHeight:"100vh",backgroundColor:"#eae7dc"}}>
            <Header></Header>
            <Grid container component="main"  direction="column" justifyContent="flex-start"alignItems="center"  
                spacing={5} minHeight="100vh">          
                <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
                <Typography variant="h2" align="center" className={classes.bill} style={{fontFamily:'Playfair Display,serif'}}>Bill Collection</Typography>
                <Divider  sx={{ width: '20ch',marginTop:"20px",marginLeft:"43%",height:"3px",marginBottom:"15px",backgroundColor:"#e85a4f"}} />
                    <Paper sx={{ width: '1450px', overflow: 'hidden',marginTop:"50px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell key="name" sx={{fontFamily: 'Playfair Display,serif',backgroundColor:"#e85a4f",color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy==="name"}
                                                    direction = {valueToOrderBy==="name" ? orderDirection : 'asc'} onClick ={createSortHandler("name")}>
                                                    Name
                                                </TableSortLabel>
                                            </TableCell> 

                                            <TableCell key="address" sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy==="address"} 
                                                    direction = {valueToOrderBy==="address" ? orderDirection : 'asc'} onClick ={createSortHandler("address")}>
                                                    Address
                                                </TableSortLabel>
                                            </TableCell>

                                            <TableCell key="bill" sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy==="bill"} 
                                                direction = {valueToOrderBy==="bill" ? orderDirection : 'asc'} onClick ={createSortHandler("bill")}
                                                >Price($)
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell  sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Status</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                   {bool_bill_p && <TableBody>
                                    {sortedRowInformation(bill,getComparator(orderDirection,valueToOrderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row,index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{`${row.address} ${row.area}`}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.bill}</TableCell>
                                                <TableCell>
                                                    <StyledButton  sx= {{marginLeft:"18%",marginTop:"5px",backgroundColor:"#e85a4f",color:"white"}} type="submit" 
                                                        variant="contained"  onClick={collect(row.o_id)}>
                                                    Collect
                                                    </StyledButton>
                                                </TableCell>
                                                                                           
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={bill.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                </Grid>
                <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
                <Typography variant="h2" align="center" className={classes.bill} style={{fontFamily:'Playfair Display,serif'}}>Bill Collected</Typography>
                <Divider  sx={{ width: '20ch',marginTop:"20px",marginLeft:"43%",height:"3px",marginBottom:"15px",backgroundColor:"#e85a4f"}} />
                    <Paper sx={{ width: '1450px', overflow: 'hidden',marginTop:"50px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell key="name" sx={{fontFamily: 'Playfair Display,serif',backgroundColor:"#e85a4f",color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                 <TableSortLabel active={valueToOrderBy2==="name"}
                                                direction = {valueToOrderBy2==="name" ? orderDirection2 : 'asc'} onClick ={createSortHandler2("name")}>
                                                Name</TableSortLabel>
                                            </TableCell> 
                                            <TableCell key="address" sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy2==="address"} 
                                                    direction = {valueToOrderBy2==="address" ? orderDirection2 : 'asc'} onClick ={createSortHandler2("address")}
                                                    >Address
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell key="bill" sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy2==="bill"} 
                                                    direction = {valueToOrderBy2==="bill" ? orderDirection2 : 'asc'} onClick ={createSortHandler2("bill")}
                                                    >Price($)
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell key="collection_date" sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>
                                                <TableSortLabel active={valueToOrderBy2==="collection_date"} 
                                                    direction = {valueToOrderBy2==="collection_date" ? orderDirection2 : 'asc'} onClick ={createSortHandler2("collection_date")}
                                                    >Date
                                                </TableSortLabel>
                                            </TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    {bool_bill && 
                                    <TableBody>
                                    { sortedRowInformation(billCollected,getComparator(orderDirection2,valueToOrderBy2))
                                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                        .map((row,index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{`${row.address} ${row.area}`}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.bill}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.collection_date.substring(0,10)}</TableCell>           
                                                                                           
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={billCollected.length}
                                rowsPerPage={rowsPerPage2}
                                page={page2}
                                onPageChange={handleChangePage2}
                                onRowsPerPageChange={handleChangeRowsPerPage2}
                            />
                        </Paper>
                </Grid>
            </Grid>
            
            
            
        </div>
    )
}

export default BillCollection;