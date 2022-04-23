
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useState  , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';

const axios = require("axios");

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
      }, 
    logo: {
        paddingTop:"20px"
    },
    SignUp:{
        fontFamily:'Playfair Display,serif',
        color:"#e85a4f",
        paddingTop:"40px",
        paddingBottom:"40px"
    },
    image:{
        height:"100%"
    },
  });

  const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
        width: '44ch'
      }
  })




const Login = () =>{

   

    const classes = useStyles();
    const navigate = useNavigate();
  
    const [password,setPassword] = useState("")
    
    const [showPassword,setShowPassword] = useState(false)

  
    const pass = process.env.REACT_APP_PASSWORD

    useEffect(()=>{
        localStorage.removeItem("id")
    },[])
    const submit = async(e)=>{
        e.preventDefault();
      
       
        if(password===pass){
            Swal.fire({
                icon: 'success',
                title:'done',
                text: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
          })
          localStorage.setItem('id',parseInt(process.env.REACT_APP_ID));
          navigate('/admin/support');
        }
        else{
           
           
            Swal.fire({
                icon: 'error',
                title:'done',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
            
        }
    }
    return(

        <Grid container component="main"   className={classes.root}>
            <Grid item  lg={6} md={4} xs={2}>
                    <img src="../images/signup_photo.png" alt="Login" className={classes.image}></img>
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
                        <Typography component="h4" variant="h4" className={classes.SignUp}  fontFamily='Playfair Display,serif'>SIGN IN FOR ADMIN</Typography>
                    </Grid>
                    <Grid item lg={7} className={classes.form}>
                           
                        
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
                    
                           

                            <StyledButton
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"27%",marginTop:"20px",
                                backgroundColor:"#e85a4f"}}
                                variant="contained"
                                onClick={submit}>
                                Sign IN
                            </StyledButton>
                    </Grid>
    
                   
                    
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Login;