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
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const axios = require("axios");


const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        
        fontFamily : "Space Mono, monospace",
        // backgroundColor:'#ddd'
      }, 
    logo: {
        paddingTop:"8px"
    },
    Profile:{
        fontFamily : 'Space Mono',
        color:"#88888"
    },
   

  });




const ProfileVen = () =>{

    

    const classes = useStyles();
    const navigate = useNavigate();
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [charge,setCharge] = useState("")
    const [area,setArea] = useState("")
    const [address,setAddress] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [name,setName] = useState("")
    //const [lat,setLat] = useState(0.0)
    //const [long,setLong] = useState(0.0)


    const id = localStorage.getItem('id');

    const getData = async () => {
        const response = await axios.get(`http://localhost:4000/vendor/profile/${id}`)
        setState(response.data[0].state)
        setCity(response.data[0].city)
        setCharge(response.data[0].charge)
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

        const mapBoxToken= process.env.REACT_APP_MAPBOX_TOKEN;
        
        const geocoder=mbxGeocoding({
            accessToken:mapBoxToken,
            types: 'country,region,place,postcode,locality,neighborhood,address'
        });
    

        const add = `${address} , ${area} , ${city} , ${state} , United States`

        const GeoData=await geocoder.forwardGeocode({
            query:add,
            limit:1
        }).send()
        

        // setLat(GeoData.body.features[0].center[1])
        // setLong(GeoData.body.features[0].center[0])
        console.log("location cor")
        console.log(GeoData.body.features[0])

        const result = await axios.put(`http://localhost:4000/vendor/profile/${id}`,{
            phoneno:phoneno,
            address:address,
            area:area,
            charge:charge,
            name:name,
            latitude:GeoData.body.features[0].center[1],
            longitude:GeoData.body.features[0].center[0],
            city:city,
            state:state
        })

        console.log(result.data)
        if(result.data==="yes"){
            Swal.fire({
                icon: 'success',
                title:'done',
                text: 'Successfully Posted',
                showConfirmButton: false,
                timer: 1500
          })
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title:'done',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer:   1500
          })
          
        }
        //window.location.reload(true)
    }


    return(
       <div><Header />
        <Grid container component="main"   className={classes.root}>
             
            <Grid item lg={6} md={4} xs={2}>
                <Grid container direction="column"  
                    justifyContent="space-evenly"
                    alignItems="center" 
                    spacing={5}>
                    <Grid item lg={2} marginLeft="auto">
                         
                    </Grid>
                    <Grid item lg={2} marginLeft="85%">
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
                                // disabled={true}
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
                                // disabled={true}
                            />

                            
                          
                            
                    
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"75%",
                                marginBottom:"20px"}}
                                id="charge"
                                label="Charge"
                                name="charge"
                                value={charge!=null ? charge : ""}
                                onChange={(e)=>setCharge(e.target.value)}
                                autoComplete="charge"
                                autoFocus
                            />

                            

                            <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"75%",marginTop:"20px",marginBottom:"30px"}}
                                variant="contained"
                                onClick={submit}>
                                {charge===null ? "Submit" : "Update"}
                            </Button>
                    </Grid>
    
                
                    
                </Grid>
            </Grid>
        </Grid>
        </div>
    )

}

export default ProfileVen;