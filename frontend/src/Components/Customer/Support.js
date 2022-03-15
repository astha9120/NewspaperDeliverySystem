
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const axios = require("axios")

const useStyles = makeStyles({
    root: {
        height: '100vh',
      },
    need:{
        color:"#B939A4",
        padding:"20px",
    },
    image:{
        display: "block",
        margin :"auto",
        width: "50%",
        marginTop:"150px"
    },
    header:{
        backgroundColor:"#364477",
        height:"60px",
        marginTop:"0px",
    },
    logo: {
        paddingTop:"20px",
        paddingLeft:"30px",
        backgroundColor:"#FF6D7F"
    }
  });




const Support = () =>{

    const classes = useStyles();
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [city,setCity] = useState("")
    const [newspaper,setNewspaper] = useState("")
    const [issue,setIssue] = useState("")
    const id = localStorage.getItem("id")

    const submit = (e)=>{
        e.preventDefault()
        axios.post(`http://localhost:4000/customer/support/${id}`,{
            name:name,
            city:city,
            newspaper:newspaper,
            issue:issue            
        })
        .then((res)=>{
            console.log(res.data);
            if(res.data==="yes"){
                Swal.fire({
                    icon: 'success',
                    title:'done',
                    text: 'Successfully Submitted Your Suggestion',
                    showConfirmButton: false,
                    timer: 1500
              })
              navigate('/aboutus')
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title:'done',
                    text: 'Something went wrong Try again',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/support');
            }
        })
    }
    return(
        <div style={{minHeight:"100vh"}}>
            <div className={classes.logo} >
                <img src = "../images/newsDaily.png" alt="logo" ></img>
            </div>
        <Grid container component="main"   className={classes.root}>
            <Grid item  lg={6} md={4} xs={2}  sx={{backgroundColor:"#00C2FF"}}>
                <img src="../images/support.png" alt="support" className={classes.image}></img>
                <Typography
                    align="center" 
                    component="h6" variant="h6"
                    paddingTop="80px"
                    color="#FFFFFF">
                        Call us : 9812437560
                </Typography>
                <Typography  align="center"
                    component="h6" variant="h6"
                    color="#FFFFFF">
                        Email us : btp_news@gmail.com
                </Typography>         
            </Grid>
            
            <Grid item lg={6} md={4} xs={2} >
                <Typography component="h4" variant="h4" className={classes.need}  align="center" >NEED TO REACH OUT TO US</Typography>
                        
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"20px",marginTop:"30px"}}
                                id="name"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                autoComplete="name"
                                
                            /> 
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"20px"}}
                                id="city"
                                label="City"
                                name="city"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                autoFocus
                            />  
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"20px"}}
                                id="newspaper"
                                label="Newspaper"
                                name="newspaper"
                                value={newspaper}
                                onChange={(e)=>setNewspaper(e.target.value)}
                                autoFocus
                            />  
                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"20px"}}
                                id="issue"
                                label="Issue/Suggestion"
                                name="issue"
                                value={issue}
                                onChange={(e)=>setIssue(e.target.value)}
                                autoFocus
                            />  
                            
                            <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"27%",marginTop:"20px"
                                ,backgroundColor:"#EFF32C",color:"black"}}
                                variant="contained"
                                onClick={submit}>
                                Send
                            </Button>
            </Grid>
        </Grid>
        </div>
    )

}

export default Support;