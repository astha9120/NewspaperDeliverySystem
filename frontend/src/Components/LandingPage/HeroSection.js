import React from 'react';
import '../../App.css'
import Button from '@mui/material/Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';


function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>WELCOME TO NEWSDAILY</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
        type="submit"
          
           sx={{ width: '20ch',marginRight:"13px", marginTop:"20px",color:"white", backgroundColor: "transparent",cursor:"pointer",borderRadius:"2px",borderColor:"white",fontWeight:"bold", padding:"8px 20px"}}
           variant="outlined"
          onClick={()=>navigate('/login')}
          
        >
         LOGIN
        </Button>
        <Button
          
          variant="contained"
             sx={{ width: '20ch',marginTop:"20px",backgroundColor:"white",color:"black",cursor:"pointer",fontWeight:"bold",borderRadius:"4px",padding:"10px 20px"}}
            
          onClick={()=>navigate('/signup')}
        >
         SIGN UP 
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
