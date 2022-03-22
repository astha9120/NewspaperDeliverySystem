import Header from './Header';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';
const axios = require("axios");

const useStyles = makeStyles({
    root: {
        // backgroundColor:'#ddd'
        minHeight:"100vh"
      }, 
    logo: {
        paddingTop:"8px"
    },
    Profile:{
        fontFamily : "Roboto",
        color:"#88888"
    },
   

  });




const ProfileCust = () =>{

    

    const classes = useStyles();
    const navigate = useNavigate();
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [area,setArea] = useState("")
    const [address,setAddress] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [name,setName] = useState("")
    const [latitude,setLatitude] = useState(22)
    const [longitude,setLongitude] = useState(73)


    const id = localStorage.getItem('id');
    console.log("id "+id)

    const getData = async () => {
        const response = await axios.get(`http://localhost:4000/customer/profile/${id}`)
        setState(response.data[0].state)
        setCity(response.data[0].city)
        setArea(response.data[0].area)
        setAddress(response.data[0].address)
        setPhoneno(response.data[0].phoneno)
        setName(response.data[0].name)
        
    }
    
    useEffect(() => {
        getData();
    }, []);

    const submit = async(e)=>{
        e.preventDefault();
        const result = await axios.put(`http://localhost:4000/customer/profile/${id}`,{
            phoneno:phoneno,
            address:address,
            area:area,
            name:name,
            longitude:longitude,
            latitude:latitude
        })
        console.log(result.data)
        if(result.data==="not available"){
            Swal.fire({
                icon: 'error',
                title:'Sorry',
                text: 'Service not available',
                showConfirmButton: false,
                timer:   1500
          })
          navigate(`/customer/profile`);
        }
        else{
         
          Swal.fire({
            icon: 'success',
            title:'done',
            text: 'Successfully Posted',
            showConfirmButton: false,
            timer: 1500
      })
        navigate(`/customer/profile/proNext`);
        }
    }


    return(
        <div>
            <Header />
        <Grid container component="main"   className={classes.root}>
            
            <Grid item lg={6} md={4} xs={2}>
                <Grid container direction="column"  
                    justifyContent="space-evenly"
                    alignItems="center" 
                    spacing={5}>
                    <Grid item lg={2} marginLeft="75%">
                         {/* <img src = "../images/newsDaily.png" alt="logo" className={classes.logo}></img> */}
                    </Grid>
                    <Grid item lg={2} marginLeft="84%">
                        <Typography component="h4" variant="h4" className={classes.Profile}>Profile</Typography>
                    </Grid>
                    <Grid item lg={7} className={classes.form}>
                    <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="name"
                                label="Name"
                                name="name"
                                value={name!=null ? name : ""}
                                onChange={(e)=>setName(e.target.value)}
                                autoComplete="name"
                                autoFocus
                            />
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="phoneno"
                                label="Phone Number"
                                name="phoneno"
                                value={phoneno!=null ? phoneno : ""}
                                onChange={(e)=>setPhoneno(e.target.value)}
                                autoComplete="phoneno"
                                autoFocus
                            />

                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="address"
                                label="Address"
                                name="address"
                                value={address!=null ? address : ""}
                                onChange={(e)=>setAddress(e.target.value)}
                                autoComplete="address"
                                autoFocus
                            />

                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="area"
                                label="Area"
                                name="area"
                                value={area!=null ? area : ""}
                                onChange={(e)=>setArea(e.target.value)}
                                autoComplete="area"
                                autoFocus
                            />  

                        <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="city"
                                label="City"
                                name="city"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                autoComplete="city"
                                autoFocus
                                disabled={true}
                            />
                            
                        <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="state"
                                label="State"
                                name="state"
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                autoComplete="state"
                                autoFocus
                                disabled={true}
                            />

                            <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"75%",marginTop:"20px",marginBottom:"30px"}}
                                variant="contained"
                                onClick={submit}>
                                {state===null ? "Submit" : "Update"}
                            </Button>
                    </Grid>
    
                
                    
                </Grid>
            </Grid>
        </Grid>
        </div>
    )

}

export default ProfileCust;