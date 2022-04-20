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


const axios = require("axios")

const useStyles = makeStyles({
    bill:{
        textAlign:"center",
        paddingTop:"40px",
        paddingBottom:"30px",
        color:"#e85a4f"
    }
})

const  BillCollection=()=>{
    const classes = useStyles();
    const navigate = useNavigate();
    const [bill,setBill]= useState([{name:"",bill:0,address:"",area:"",bill_status:0,o_id:-1}])
    const [billCollected,setBillCollected]=useState([{name:"",bill:0,address:"",area:"",collection_date:"",o_id:-1}])
    const id = localStorage.getItem('id')

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


    const getBills=async()=>{
        const result = await axios.get(`http://localhost:4000/ndb/billcollection/${id}`)
        console.log("yet to be collected")
        console.log(result.data)
        setBill(result.data)
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

                axios.put(`http://localhost:4000/ndb/billcollection/${o_id}`)
                .then(res=>{
                    console.log("collect button click")
                    console.log(res.data)
                })
            }   
        })
      
        
        window.location.reload(true)
    }

    const bill_collected = async()=>{
        let  date = new Date()
        const month = date.getMonth();
        date.setMonth(month-1)
        date = date.toJSON().slice(0,10).replace(/-/g,'-')

        const result = await axios.get(`http://localhost:4000/ndb/billcollection/${id}/${date}`)
        console.log("collected bill")
        console.log(result.data)
        setBillCollected(result.data)
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
                    <Paper sx={{ width: '1300px', overflow: 'hidden',marginTop:"50px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{fontFamily: 'Playfair Display,serif',backgroundColor:"#e85a4f",color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Name</TableCell> 
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Address</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Price</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Status</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {bill
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.o_id}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.address}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.bill}</TableCell>
                                                <TableCell>
                                                    <Button  sx= {{marginLeft:"35%",marginTop:"5px",backgroundColor:"#e85a4f",color:"white"}} type="submit" 
                                                        variant="contained"  onClick={collect(row.o_id)}>
                                                    Collect
                                                    </Button>
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
                    <Paper sx={{ width: '1300px', overflow: 'hidden',marginTop:"50px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{fontFamily: 'Playfair Display,serif',backgroundColor:"#e85a4f",color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Name</TableCell> 
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Address</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Price</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"22px" ,textAlign:"center"}}>Date</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {billCollected
                                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.o_id}>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.name}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.address}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.bill}</TableCell>
                                                <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"16px",textAlign:"center"}}>{row.collection_date.substring(0,10)}</TableCell>           
                                                                                           
                                            </TableRow>
                                        )})
                                    }
                                    </TableBody>
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