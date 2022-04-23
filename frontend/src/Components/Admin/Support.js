import Header from './Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';

const axios = require("axios");

const useStyles = makeStyles({
 
  });


const Support = () => {

    const classes = useStyles();
    const [issue,setIssue] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(true)
  
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
            
            axios.get(`http://localhost:4000/admin/support`)
            .then(res=>{
              
              if(res.data.length==0)
                setList(false)
              setIssue(res.data)
            })

        
    },[])


  return (
    <div  style={{backgroundColor:"#eae7dc"}}>
    <Header/>
    <Grid container component="main"  
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"  
          className={classes.root}
          spacing={9} minHeight="100vh"
          marginTop="20px" > 
          
          
          {!list&&
            <Typography align="center" variant="h2" style={{paddingTop:"150px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
              No Issues Yet
            </Typography>
          }
          {list &&  id===process.env.REACT_APP_ID &&
            
        <Grid item lg={6} md={4} xs={2} sx={{marginTop:"0px",marginBottom:"40px"}}>
              <Typography variant="h2" align="center" sx={{color:"#e85a4f",marginBottom:"20px",fontFamily:'Playfair Display,serif'}}>Issue / Suggestion</Typography>
                <Divider  sx={{ width: '50ch',marginTop:"20px",marginLeft:"35%",height:"3px",marginBottom:"15px",backgroundColor:"#e85a4f"}} />          
                <Paper sx={{ width: '1435px', overflow: 'hidden',marginTop:"60px"}}>
                            <TableContainer sx={{ maxHeight: 600}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Issue ID</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Name</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Email</TableCell>
                                            <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Suggestion</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {issue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.issue_id}>
                                                        <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.issue_id}</TableCell>
                                                        <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.name}</TableCell>
                                                        <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.email}</TableCell>
                                                        <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.suggestion}</TableCell>
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
                                count={issue.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>  
      </Grid>
      }
    </Grid>
        
    {/* </Grid> */}
    </div>
    
  );
}

export default Support;
