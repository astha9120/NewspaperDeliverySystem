import Header from './Header'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { makeStyles } from '@mui/styles';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';



const axios = require("axios");



const useStyles = makeStyles({
    main:{
        textAlign:"center",
        minHeight:"100vh",
        fontFamily:'Playfair Display,serif',
        backgroundColor:"#eae7dc"
    },
})

const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
        width: '25ch'
      }
  })

const StyledButton2 = styled(Button)({
    '&:hover': {
        backgroundColor: '#9C9A93',
        boxShadow: '20',
        width: '62ch'
      }
  })

const Addnews = ()=>{

    const classes = useStyles();
    const navigate = useNavigate();


    const [allnews,setAllnews]=useState([])
    const [newspaper,setNewspaper]=useState([]);
    const [single,setSingle]=useState({name:"",nid:""});
    const [new_np,setNew_np]=useState([]);

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

    const id = localStorage.getItem('id');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/vendor/addnews`)
            .then(res => setAllnews(res.data))
            .catch(err=>navigate('/error'))
        
        axios.get(`${process.env.REACT_APP_URL}/vendor/addnews/${id}`)
        .then(
                res => 
                {
                    if(res.data.length>0){
                        setNewspaper(res.data)
                    }
                }
            ).catch(err=>navigate('/error'))
    }, [])
    
    const set_newspaper =async ()=>{
        console.log(single)
        let flag=0;
        
        await newspaper.map(e=>{
            if(e.name===single.name && e.n_id===single.n_id)
                flag=1;
        })

        if(!flag){
            setNew_np(prev=>[...prev,single])
            setNewspaper(prev=>[...prev,single])
        }
           
    }

    const submit = async(e)=>{
            e.preventDefault();
            if(newspaper.length!=0){
                try {
                    const result = await axios.post(`${process.env.REACT_APP_URL}/vendor/addnews`,
                    {
                        newspaper:new_np,
                        id:id
                    }) 
                    console.log("result")
                    console.log(result)  
                } catch (error) {
                    navigate('/error')
                }
                
            }
            else{
                try {
                    const result = await axios.post(`${process.env.REACT_APP_URL}/vendor/addnews`,
                    {
                        newspaper:newspaper,
                        id:id
                    })  
                } catch (error) {
                    navigate('/error')
                }
               
            }
           

             Swal.fire({
                icon: 'success',
                title:'done',
                text: 'Submitted successfully',
                showConfirmButton: false,
                timer: 1500
            })

            window.location.reload(true);
        }

    return(
        <div className={classes.main}>    
                <Header /> 
               
                <TextField
              placeholder="Search newspapers"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{marginTop:"50px",marginLeft:"33%",width:"33%"}}
            />
                <Grid container component="main" >
                <Grid item lg={6} md={4} xs={2}>
                        <Typography variant="h2" sx={{marginTop:"60px",fontFamily:'Playfair Display,serif',color:"#e85a4f"}}>Add Newspaper</Typography>
                        <TextField
                            id="outlined-select-news"
                            select
                            margin="normal"
                            sx={{width:"50ch" , marginLeft:"auto" , marginRight:"auto" , marginTop:"40px"}}
                            label="Select the newspaper"
                            value={single}
                            onChange={(e)=>setSingle(e.target.value)}
                            >
                            {allnews.map((option) => (
                                <MenuItem key={option.name} value={option}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
            
                        <div>
                            <StyledButton2
                                sx={{ width: '62ch',marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px",
                                    backgroundColor:"#d8c3a5",color:"black"}}
                                    variant="contained"
                                    onClick={set_newspaper}>
                                Click here to add
                            </StyledButton2> 
                        </div>  
                        <div>
                            <StyledButton
                                sx={{ width: '25ch',marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"60px",
                                backgroundColor:"#e85a4f"}}
                                variant="contained"
                                onClick={submit}>
                                Submit the list
                            </StyledButton> 
                        </div>
                        
                    </Grid>
                    <Grid item lg={6} md={4} xs={2}>
                        <Paper sx={{ width: '500px', overflow: 'hidden',marginTop:"60px"}}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                           <TableCell sx={{backgroundColor:"#e85a4f",fontFamily:'Playfair Display,serif',color:"white",
                                            fontSize:"25px" ,textAlign:"center"}}>Newspaper List</TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {newspaper.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            if(row.name.toLowerCase().includes(filter.toLowerCase())===true){
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.n_id}>
                                                        <TableCell sx={{fontFamily:'Nunito,sans-serif',fontSize:"18px",textAlign:"center"}}>{row.name}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        })
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

                   
                </Grid>
               
            </div>
    )
}

export default Addnews;