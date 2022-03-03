
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles({
    root: {
        height: '100vh',
      }, 
    logo: {
        paddingTop:"20px"
    },
    SignUp:{
        fontFamily : "Roboto",
        color:"#B939A4"
    },
    image:{
        height:"100%"
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

    const cities = ['Ahmeadabad Gujarat','Vadodara Gujarat','Mumbai Maharastra']
    const classes = useStyles();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [user,setUser] = useState("")
    const [showPassword,setShowPassword] = useState(false)

    const submit = (e)=>{
        e.preventDefault()
        console.log(email)
        console.log(password)
        console.log(city)
        console.log(user)
    }
    return(

        <Grid container component="main"   className={classes.root}>
            <Grid item  lg={6} md={4} xs={2}>
                    <img src="../images/signup_photo.png" alt="signup" className={classes.image}></img>
            </Grid>
            <Grid item lg={6} md={4} xs={2}>
                <Grid container direction="column"  
                    justifyContent="space-evenly"
                    alignItems="center" 
                    spacing={4}>
                    <Grid item lg={2}>
                         <img src = "../images/newsDaily.png" alt="logo" className={classes.logo}></img>
                    </Grid>
                    <Grid item lg={2}>
                        <Typography component="h4" variant="h4" className={classes.SignUp}>SIGN UP</Typography>
                    </Grid>
                    <Grid item lg={7} className={classes.form}>
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
                                autoFocus
                            />
                        
                            <FormControl sx={{ width: '40ch',
                                marginLeft:"27%",
                                marginBottom:"10px"}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={()=>setShowPassword((prev=>!prev))}
                                            onMouseDown={(e)=>{e.prevenDefault()}}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            
                            <TextField
                                id="outlined-select-city"
                                select
                                margin="normal"
                                sx={{ width: '40ch',marginLeft:"27%",marginBottom:"10px"}}
                                label="Select the city"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                >
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                    {city}
                                    </MenuItem>
                                ))}
                            </TextField>
                        
                            <TextField
                                id="outlined-select-currency"
                                select
                                margin="normal"
                                sx={{ width: '40ch',marginLeft:"27%",marginBottom:"10px"}}
                                label="Select the user"
                                value={user}
                                onChange={(e)=>setUser(e.target.value)}
                                >
                                {users.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"27%",marginTop:"20px"}}
                                variant="contained"
                                onClick={submit}>
                                Sign Up
                            </Button>
                    </Grid>
    
                    <Grid item lg={1}>
                        <Link href="#" variant="body2">
                            {"Already have an account? Sign in"}
                        </Link>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )

}

export default SignUp;