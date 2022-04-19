import React from "react"
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
        fontFamily: 'Playfair Display,serif',
        color:"#e85a4f",
        paddingTop:"50px",
        paddingRight:"250px"
    },
   

  });




const ProfileVen = () =>{

    

    const classes = useStyles();
    const navigate = useNavigate();
    //const [state,setState] = useState("")
    //const [city,setCity] = useState("")
    const [charge,setCharge] = useState("")
    const [area,setArea] = useState("")
    const [address,setAddress] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [name,setName] = useState("")
    const id = localStorage.getItem('id');

    

      const mapBoxToken= process.env.REACT_APP_MAPBOX_TOKEN;

      const [viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: 74.0060,
        zoom: 8,
      });


      const geocoderContainerRef = useRef();
      const mapRef = useRef();
      const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );

    // const set_Add = async(e)=>{

    //     let place=''

    //     place = await e.result.place_name.map(p=>{
    //         place.append(p)
    //         if(p==',')
    //             return place
    //     })

    //     setArea(place)
    //     console.log("area is")
    //     console.log(area)

    // }   

    const getData = async () => {
        const response = await axios.get(`http://localhost:4000/vendor/profile/${id}`)
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

        const result = await axios.put(`http://localhost:4000/vendor/profile/${id}`,{
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
       <div>
        <Header />
        <Grid container component="main"   className={classes.root}>
             
            <Grid item lg={6} md={4} xs={2}>
                <Grid container direction="column"  
                    justifyContent="space-evenly"
                    alignItems="center" 
                    spacing={5}>
                    <Grid item lg={2}>
                        <Typography component="h4" variant="h4" className={classes.Profile}>PROFILE</Typography>
                    </Grid>
                    <Grid item lg={7} className={classes.form}>
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"10%",
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
                                marginLeft:"10%",
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
                                marginLeft:"10%",
                                marginBottom:"20px"}}
                                id="address"
                                label="House number"
                                name="address"
                                value={address!=null ? address : ""}
                                onChange={(e)=>setAddress(e.target.value)}
                                autoComplete="address"
                                autoFocus
                            />

                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"10%",
                                marginBottom:"20px"}}
                                id="charge"
                                label="Charge per month"
                                name="charge"
                                value={charge!=null ? charge : ""}
                                onChange={(e)=>setCharge(e.target.value)}
                                autoComplete="charge"
                                autoFocus
                            />

                            

                            <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"10%",marginTop:"20px",marginBottom:"30px"}}
                                variant="contained"
                                onClick={submit}>
                                {charge===null ? "Submit" : "Update"}
                            </Button>
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
                            mapRef={mapRef}
                            containerRef={geocoderContainerRef}
                            onViewportChange={handleViewportChange}
                            mapboxApiAccessToken={mapBoxToken}
                            position="top-left"
                            onResult = {(r)=>setArea(r.result.place_name)}
                        />
                    </MapGL>
            </Grid>
        </Grid>
    </div>
    )

}

export default ProfileVen;