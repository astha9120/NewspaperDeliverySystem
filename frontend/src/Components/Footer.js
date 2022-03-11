import { Typography } from "@mui/material"
import Grid from '@mui/material/Grid'


const Footer = ()=>{
    return(
        <Grid container component="main" style={{position:"relative",bottom:"0"}}>
           <Grid item lg={3} md={2} xs={1} backgroundColor="#364477" color="white">
               <Typography align="left" sx={{fontSize:"16px",paddingLeft:"30px",color:"#EFF32C",paddingTop:"10px"}}>Contact us</Typography>
               <Typography align="left" sx={{fontSize:"13px",paddingLeft:"30px"}}>9087564312</Typography>
               <Typography align="left" sx={{fontSize:"13px" ,paddingLeft:"30px",paddingBottom:"10px"}}>btp_news@gmail.com</Typography>
           </Grid>
           <Grid item lg={3} md={2} xs={1} backgroundColor="#364477" color="white">
               <Typography align="left" sx={{fontSize:"16px",paddingLeft:"30px",color:"#EFF32C",paddingTop:"10px"}}>Office:</Typography> 
               <Typography align="left" sx={{fontSize:"13px",paddingLeft:"30px"}}>2/15 meena road</Typography>
               <Typography align="left" sx={{fontSize:"13px" ,paddingLeft:"30px",paddingBottom:"10px"}}>Naranpura Ahmedabad-63</Typography>
           </Grid>

          <Grid item lg={3} md={2} xs={1} backgroundColor="#364477" color="white">
                <Typography align="center" sx={{fontSize:"14px",paddingTop:"20px"}}>Fast News Paper Delivery</Typography>
                <Typography align="center" sx={{fontSize:"12px",fontWeight:"light"}}>All rights Reserved</Typography>
            </Grid>
            <Grid item lg={3} md={2} xs={1} backgroundColor="#364477" align="right">
                <div style={{paddingTop:"25px"}}>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><i className="fab fa-facebook-f"></i></a>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><i className="fab fa-twitter"></i></a>
                    <a href="" style={{paddingRight:"10px",color:"white"}}><i className="fab fa-instagram"></i></a>          
                    <a href="" style={{paddingRight:"50px",color:"white"}}><i class="fab fa-pinterest-p"></i></a>
                </div>          
            </Grid>
        </Grid> 
    )
}

export default Footer