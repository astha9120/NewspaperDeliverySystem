import { Typography } from "@material-ui/core";

const Error = ()=>{
    return(
        <div>
            <Typography align="center" variant="h2" style={{fontFamily:'Playfair Display,serif',paddingTop:"40px"}}>400 That's an Error</Typography>
            <Typography align="center" variant="h4" style={{fontFamily:'playfair Display,serif',paddingTop:"20px"}} >Bad Request</Typography>
            <img src="../images/bot.png" alt="Error Page" style={{marginLeft:"32%",paddingTop:"40px",paddingBottom:"40px"}}></img>
        </div>   
    )
}

export default Error;
