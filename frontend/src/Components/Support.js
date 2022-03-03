
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

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




const SignUp = () =>{

    const users = [
        {
          value: 'User',
          label: 'User',
        },
        {
          value: 'NDB',
          label: 'Newspaper Delivery Boy',
        },
        {
          value: 'Venodr',
          label: 'Vendor',
        }]

    const classes = useStyles();
    const [name,setName]=useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone]=useState("")
    const [city,setCity] = useState("")
    const [newspaper,setNewspaper] = useState("")
    const [issue,setIssue] = useState("")

    const submit = (e)=>{
        e.preventDefault()
        console.log(email+name+phone+city+issue)
        
    }
    return(
        <div>
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
                                marginBottom:"20px"}}
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
                                id="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                autoComplete="email"
                                
                            />

                            <TextField
                                required
                                sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"20px"}}
                                id="phone"
                                label="Phone No"
                                name="phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                autoFocus
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

export default SignUp;