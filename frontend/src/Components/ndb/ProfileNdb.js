import Header from './Header';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2';

import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {useRef, useCallback } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { styled } from '@mui/material/styles';
import mapboxgl from 'mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax


const axios = require("axios");

const useStyles = makeStyles({
    ndb_root: {
        minHeight: '100vh',
        fontFamily:'Playfair Display,serif',
      }, 
  });

  const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
        width: '48ch'
      }
  })



const ProfileNdb = () =>{

    

    const classes = useStyles();
    const navigate = useNavigate();
    const [charge,setCharge] = useState("")
    const [area,setArea] = useState("")
    const [address,setAddress] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [name,setName] = useState("")
    const [profile_stat,setProfile_stat] = useState("Your profile has not been verified")


    const id = localStorage.getItem('id');
    console.log("id "+id)

    const mapBoxToken= process.env.REACT_APP_MAPBOX_TOKEN;

      const [viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 8,
      });


      const geocoderContainerRef = useRef();
      const mapRef = useRef();
      const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}/ndb/profile/${id}`)
        setCharge(response.data[0].charge)
        setArea(response.data[0].area)
        setAddress(response.data[0].address)
        setPhoneno(response.data[0].phoneno)
        setName(response.data[0].name)
        if(response.data[0].accept==1)
            setProfile_stat("Your profile is verified")
        
    }
    
    useEffect(() => {
        getData();
    }, []);

    const submit = async(e)=>{
        e.preventDefault();

        const result = await axios.put(`${process.env.REACT_APP_URL}/ndb/profile/${id}`,{
            phoneno:phoneno,
            address:address,
            area:area,
            charge:charge,
            name:name,
            latitude:viewport.latitude,
            longitude:viewport.longitude,
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
            navigate(`/ndb/profile`);
        }
        else{
            Swal.fire({
                icon: 'error',
                title:'done',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer:   1500
          })
          navigate(`/ndb/profile`);
        }
    }


    return(
        <div style={{backgroundColor:"#eae7dc"}}>
            <Header />
        <Grid container component="main"   className={classes.ndb_root}>
            
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
                    <Grid item lg={7}>
                    
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
                                label="Charge per month"
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
                <div style={{marginTop:"50px"}} ref={geocoderContainerRef}/>
                    <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="90%"
                        height="500px"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={mapBoxToken}
                    >
                        <Geocoder
                            required
                            mapRef={mapRef}
                            containerRef={geocoderContainerRef}
                            onViewportChange={handleViewportChange}
                            mapboxApiAccessToken={mapBoxToken}
                            position="top-left"
                            onResult = {(r)=>setArea(r.result.place_name)}
                        />
                    </MapGL>
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

export default ProfileNdb;