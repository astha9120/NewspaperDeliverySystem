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
import { styled } from '@mui/material/styles';


import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {useRef, useCallback } from 'react'
// import MapGL from 'react-map-gl'
// import Geocoder from 'react-map-gl-geocoder'
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css'

const axios = require("axios");

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const useStyles = makeStyles({
    cust_root: {
        // backgroundColor:'#ddd'
        minHeight: '100vh',
        fontFamily:'Playfair Display,serif',
      }
  });

  const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#e85a4f',
        boxShadow: '20',
        width: '48ch'
      }
  })


const ProfileVen = () =>{

    
   
    const classes = useStyles();
    const navigate = useNavigate();
    const [area,setArea] = useState("")
    const [address,setAddress] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [name,setName] = useState("")
    const [profile_stat,setProfile_stat] = useState("Your profile has not been verified")
    const [charge,setCharge] = useState("")

    const id = localStorage.getItem('id');
    
    const mapBoxToken= process.env.REACT_APP_MAPBOX_TOKEN;
    
    const mapContainer = useRef(null);
    const navigationControl = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.935242);
    const [lat, setLat] = useState(40.730610);
    const [zoom, setZoom] = useState(11.03);

    //code

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
        navigationControl.current = new mapboxgl.NavigationControl();
        map.current.addControl(navigationControl.current);
      }, []);
    
      useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));

        });
        map.current.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
            );
          
           
      },[]);
    
      


    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/vendor/profile/${id}`);
            setCharge(response.data[0].charge)
            setArea(response.data[0].area)
            setAddress(response.data[0].address)
            setPhoneno(response.data[0].phoneno)
            setName(response.data[0].name)
            setLat(response.data[0].latitude)
            setLng(response.data[0].longitude)
            if(response.data[0].accept==1)
            setProfile_stat("Your profile is verified") 
        } catch (error) {
            navigate('/error')
        }
        
    }
    
    useEffect(() => {
        getData();
    }, []);

  
  
    const submit = async(e)=>{

        e.preventDefault();
         
        try {
            const result = await axios.put(`${process.env.REACT_APP_URL}/vendor/profile/${id}`,{
                phoneno:phoneno,
                address:address,
                area:map.current._controls[3].lastSelected != null ? JSON.parse(map.current._controls[3].lastSelected).place_name:area,
                name:name,
                latitude:lat,
                longitude:lng,
                charge:charge,
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
        } catch (error) {
            navigate('/error')
        }    
        
    }


    return(
        <div style={{backgroundColor:"#eae7dc"}}>
            <Header />
        <Grid container component="main"   className={classes.cust_root}>
            
            <Grid item lg={6} md={4} xs={2}>
                <Grid container direction="column"  
                    justifyContent="space-evenly"
                    alignItems="center" 
                    spacing={5}>
                    <Grid item lg={2}>
                        <Typography variant="h4"
                            style={{ fontFamily: 'Playfair Display,serif',color:"#e85a4f",paddingTop:"50px",paddingRight:"150px"}}
                        > PROFILE
                        </Typography>
                    </Grid>
                    <Grid item lg={7} className={classes.form}>
                    <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"15%",
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
                                marginLeft:"15%",
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
                                marginLeft:"15%",
                                marginBottom:"20px"}}
                                id="address"
                                label="House no"
                                name="address"
                                value={address!=null ? address : ""}
                                onChange={(e)=>setAddress(e.target.value)}
                                autoComplete="address"
                                autoFocus
                            />
            
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"15%",
                                marginBottom:"20px"}}
                                id="charge"
                                label="Charge per newspaper"
                                name="charge"
                                value={charge!=null ? charge : ""}
                                onChange={(e)=>setCharge(e.target.value)}
                                autoComplete="charge"
                                autoFocus
                            />

                            <StyledButton
                                type="submit"
                                margin="normal"
                                sx={{ width: '48ch',marginLeft:"15%",marginTop:"20px",marginBottom:"30px"
                                ,backgroundColor:"#e85a4f"}}
                                variant="contained"
                                onClick={submit}>
                                {charge===null ? "Submit" : "Update"}
                            </StyledButton>
                    </Grid>
               </Grid>
            </Grid>
            <Grid item lg={6} md={4} xs={2}>
                {/* <div style={{marginTop:"50px"}} ref={geocoderContainerRef}/> */}
                <div ref={mapContainer} style={{height:"100%"}} onResult = {(r)=>setArea(r.result.place_name) }/>
                    
            </Grid>
            <Typography align="center" marginTop="40px"
                marginBottom="30px" height="35px" width="100%" fontSize="20px" 
                fontFamily= 'Playfair Display,serif' backgroundColor="#e85a4f" color="white">
                {profile_stat}
            </Typography>
        </Grid>
        </div>
    )

}

export default ProfileVen;