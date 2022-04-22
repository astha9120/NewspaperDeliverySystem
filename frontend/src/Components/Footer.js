import { Typography } from "@mui/material"
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = ()=>{
    return(
        <Grid container component="main" style={{position:"relative",bottom:"0", backgroundColor:"#8e8d8a",paddingTop:"10px",justifyContent:"space-between"}}>
           <Grid item lg={3} md={2} xs={1} backgroundColor="#8e8d8a" color="white">
           <Typography align="left" sx={{fontSize:"20px",paddingLeft:"30px",color:"White",paddingTop:"10px",fontFamily:'Nunito,sans-serif'}}>CONTACT US</Typography>
           <Divider  sx={{ width: '100%',marginTop:"2px",height:"0.25px",marginLeft:"30px",marginBottom:"10px",backgroundColor:"white"}} />
               <Typography align="left" sx={{fontSize:"13px",paddingLeft:"30px",fontFamily:'Nunito,sans-serif'}}>2/15 meena road</Typography>
               <Typography align="left" sx={{fontSize:"13px" ,paddingLeft:"30px",fontFamily:'Nunito,sans-serif'}}>Naranpura Ahmedabad-63</Typography>
             
               <Typography align="left" sx={{fontSize:"13px",paddingLeft:"30px",fontFamily:'Nunito,sans-serif'}}>9087564312</Typography>
               <Typography align="left" sx={{fontSize:"13px" ,paddingLeft:"30px",paddingBottom:"10px",fontFamily:'Nunito,sans-serif'}}>btp_news@gmail.com</Typography>
           </Grid>

           <Grid item lg={3} md={2} xs={1} backgroundColor="#8e8d8a" align="center" >
           <Typography align="left" sx={{fontSize:"20px",color:"White",paddingTop:"10px",fontFamily:'Nunito,sans-serif'}}>GO SOCIAL</Typography>
           <Divider  sx={{ width: '100%',marginTop:"2px",height:"0.25px",marginBottom:"10px",backgroundColor:"white",align:"left"}} />
           <Typography align="left" sx={{fontSize:"15px",paddingLeft:"30px",fontFamily:'Nunito,sans-serif',color:"white",paddingBottom:"10px"}}>Stay in touch with us:</Typography>
                    <a href="" style={{paddingLeft:"20%",paddingRight:"10px",color:"white"}}><FacebookIcon></FacebookIcon></a>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><TwitterIcon></TwitterIcon></a>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><PinterestIcon></PinterestIcon></a>          
                    <a href="" style={{paddingRight:"10px",color:"white"}}><YouTubeIcon></YouTubeIcon></a>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><LinkedInIcon></LinkedInIcon></a>
                    <a href="" style={{paddingRight:"50px",color:"white"}}><InstagramIcon></InstagramIcon></a>

                       
            </Grid>
          

          <Grid item lg={3} md={2} xs={1} backgroundColor="#8e8d8a" color="white" paddingRight="30px" paddingBottom="13px">
          <Typography align="left" sx={{fontSize:"20px",color:"White",paddingTop:"10px",fontFamily:'Nunito,sans-serif'}}>ABOUT US</Typography>
           <Divider  sx={{ width: '100%',marginTop:"2px",height:"0.25px",marginBottom:"10px",backgroundColor:"white",align:"left"}} />
                <Typography align="left" sx={{fontSize:"13px",fontFamily:'Nunito,sans-serif'}}>NewsDaily is system to ensure that the newspaper delivery process made as smooth as possible. It caters to the needs of customer , the Newspaper Delivery Person and the vendor. The main aim is to make all the process online and to reduce unnecessary problems.</Typography>
               
            </Grid>
            
        </Grid> 
    )
}

export default Footer