import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
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
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';



const axios = require("axios");

const useStyles = makeStyles({

  });

  const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
      }
  })


const Ndblist = () => {

    const classes = useStyles();
    const [ndblist,setNdblist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    useEffect(()=>{

      
            axios.get(`${process.env.REACT_APP_URL}/admin/ndblist`)
            .then(res=>{
             
              if(res.data.length==0)
                setList(false)
              setNdblist(res.data)
            }).catch(err=>navigate('/error'))

        
    },[])

    const update = (e)=>{
        e.preventDefault()
        navigate('/admin/updatendb')
    }

    const change = async(param)=>{
        
        console.log("HERE");
        try{const result = await axios.put(`${process.env.REACT_APP_URL}/admin/ndblist/${param}`)
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
      navigate(`/admin/ndblist`);
    }}catch (error) {
      navigate('/error')
  }

        
    }

    const del = async(param)=>{
        
     try{  
       const result = await axios.delete(`${process.env.REACT_APP_URL}/admin/ndblist/${param}`)
     console.log(result.data)
     
     if(result.data==="sucess"){
             Swal.fire({
               icon: 'success',
               title:'done',
               text: 'Successfully Deleted',
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
   navigate(`/admin/ndblist`);
 }}

 catch (error) {
  navigate('/error')
}
    
  }

    

  return (
    <div style={{backgroundColor:"#eae7dc"}}>
    <Header/>
    <Grid container component="main"  
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"  
          spacing={5} minHeight="100vh"
          marginTop="20px" > 

          

          {!list&&
            <Typography align="center" variant="h2" style={{paddingTop:"150px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
                No NDB is listed till now
            </Typography>
          }
          
        {list &&   id===process.env.REACT_APP_ID &&
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
              <Typography variant="h2" align="center" sx={{color:"#e85a4f",marginBottom:"20px",fontFamily:'Playfair Display,serif'}}>Newspaper Delivery Person List</Typography>
                <Divider  sx={{ width: '50ch',marginTop:"20px",marginLeft:"35%",height:"3px",marginBottom:"15px",backgroundColor:"#e85a4f"}} />          
                <Paper sx={{ width: '1435px', overflow: 'hidden',marginTop:"60px"}}>
                            <TableContainer sx={{ maxHeight: 600}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Name</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Address</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Phone number</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Charge</TableCell> 
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {ndblist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ndb_id}>
                                                      <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.name}</TableCell>
                                                      <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{`${row.address}  ${row.area} `}</TableCell>
                                                      <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.phoneno}</TableCell>
                                                      <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.charge}</TableCell>
                                                      <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>
                                                          <StyledButton  sx= {{marginLeft:"20%",marginTop:"5px",backgroundColor:"#e85a4f"}} type="submit" 
                                                          variant="contained" disabled={row.accept} onClick={()=>change(row.ndb_id)}>
                                                          Accept
                                                          </StyledButton>
                                                          <StyledButton  sx= {{marginLeft:"20%",marginTop:"5px",backgroundColor:"#e85a4f"}} type="submit" 
                                                          variant="contained" onClick={()=>del(row.ndb_id)}>
                                                          Delete
                                                          </StyledButton>
                                                      </TableCell>
                                        </TableRow>
                                        )
                                            
                                        })
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={ndblist.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                 
                  
      </Grid>
           }
          </Grid>
        
    </div>
    
  );
}

export default Ndblist;
