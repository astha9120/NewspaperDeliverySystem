import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { TextareaAutosize } from '@mui/base';

const axios = require("axios");



function Support() {
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [msg,setMsg] = useState("")
    
    const submit = async(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:4000/customer/support`,{
            name:name,
            email:email,
            issue:msg            
        })
        .then(res=>{
            console.log(res.data)
            window.location.reload(true)
        })
    }
  return (
   <Grid container component="main" direction="row" marginTop="210px" marginBottom="50px">
                        
    <Grid item lg={6} md={4} xs={2}  paddingLeft="13%" paddingBottom="30px"  >
        <div>
            <TextField required id="s_name" label="Your Name" name="name"value={name} 
            sx={{marginBottom:"20px",width: '55ch' , backgroundColor:"white"}} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <TextField required id="s_email" label="Your Email" name="email" value={email} 
            sx={{marginBottom:"20px",width: '55ch', backgroundColor:"white"}} onChange={(e)=>setEmail(e.target.value)}/> 
        </div>
        <div>
            <TextareaAutosize required id="s_msg" placeholder="Write down Issue/Suggestion" name="msg" value={msg}
            aria-label="minimum height"
            minRows={7}
            style={{ width: 480 ,marginBottom:'30px',paddingLeft:'12px',paddingTop:'10px',fontSize:'17px',fontFamily:"roboto"}}
            maxRows={9}
             onChange={(e)=>setMsg(e.target.value)}/> 
        </div>
        <div>
            <Button type="submit" marginTop="30px" variant="contained"onClick={submit} sx={{width: '62ch',height:'7ch',backgroundColor:"orange"}}>Send
            </Button>
        </div>
          
    </Grid>

    <Grid item lg={6} md={4} xs={2}  color="white" paddingRight="15%" paddingBottom="30px">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4975637545194!2d72.62677371513573!3d23.188530984869278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a3c9618d2c5%3A0xc54de484f986b1fa!2sDA-IICT!5e0!3m2!1sen!2sin!4v1618935789789!5m2!1sen!2sin"
     width="100%" height="390" frameBorder="0" style={{border:"0"}} allowFullScreen></iframe>
    </Grid>
</Grid>
  );
}

export default Support;
