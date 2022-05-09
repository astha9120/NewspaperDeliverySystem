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

  const Getndb = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    const [obj,setObj]=useState({name:"",phoneno:""})
    const [newspaper,setNewspaper] = useState([])
    const [vendorlist,setVendorlist] = useState([]);
    const id = localStorage.getItem('id')
    const [list,setList]= useState(false)
    const [allocate,setAllocate] = useState(true)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_URL}/customer/getndb/${id}`)
        .then(res=>{
          if(res.data.length==0)
            setAllocate(false)
          //console.log(res.data[0])
          setObj(res.data[0])
        }).catch(err=>navigate('/error'))
},[])

  return (
    <div className={classes.main}>    
    <Header/>
  
    <Grid container component="main"  
          direction="column" 
          justifyContent="space-evenly"
          alignItems="center"  
          className={classes.root}
          spacing={8} minHeight="100vh" > 
          
        <Grid item lg={6} md={2} xs={1} sx={{marginTop:"60px"}}>
          {!allocate&&
             <Typography align="center" variant="h3" style={{paddingTop:"10px",paddingBottom:"20px",color:"white",fontFamily:'Playfair Display,serif'}}>
                No NewsPaper Delivery Person has been allocated to you.
             <Divider  sx={{ width: '50ch',marginTop:"30px",height:"3px",marginBottom:"10px",backgroundColor:"white"}} />
            </Typography>
          }
          {allocate &&
            <Grid container justifyContent="space-evenly" spacing={4}>

               <Grid item lg={6} md={4} xs={2} >
                  <Card sx={{ width: 600, height:500 ,backgroundColor:"#d8c3a5",marginRight:"500px",marginBottom:"80px"}}>
                      <CardContent>
                        <Typography variant="h3" color="white" sx={{fontFamily:'Playfair Display,serif'}} gutterBottom>
                          Newspaper Delivery Person 
                        </Typography>
                        <Divider  sx={{ width: '25ch',marginTop:"30px",marginLeft:"29%",height:"3px",marginBottom:"30px",backgroundColor:"white"}} />
                        <Typography fontSize="20px" color="white"  sx={{fontFamily:'Nunito,sans-serif' }} gutterBottom>
                         <strong> Information of newspaper delivery person allocated to you.</strong>
                        </Typography>
                        <Typography fontSize="20px"  marginTop="50px" color="#373737" align="center"  sx={{fontFamily: 'Playfair Display,serif'}}>
                          <strong>Name</strong> : {obj.name}
                        </Typography>
                        <Typography fontSize="20px" align="center" color="#373737" marginTop="30px" sx={{fontFamily: 'Playfair Display,serif'}}>
                          <strong>Phone number</strong> : {obj.phoneno}
                        </Typography>
                    
                      </CardContent>
                    </Card>
                </Grid> 
                </Grid>
                }
                </Grid>
                </Grid>
                
                </div>
  )
            }

            export default Getndb;
