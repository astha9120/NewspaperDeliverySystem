
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
const axios = require("axios");

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
      }, 
    logo: {
        paddingTop:"20px"
    },
    SignUp:{
        fontFamily : "Roboto",
        color:"#e85a4f"
    },
    image:{
        height:"100%"
    }
  });




const Login = () =>{

    const users = [
        {
          value: 'customer',
          label: 'Customer',
        },
        {
          value: 'ndb',
          label: 'Newspaper Delivery Boy',
        },
        {
          value: 'vendor',
          label: 'Vendor',
        }]

    const classes = useStyles();
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [user,setUser] = useState("")
    const [showPassword,setShowPassword] = useState(false)

    useEffect(()=>{
        localStorage.removeItem("id")
    },[])

    const submit = async(e)=>{
        e.preventDefault();
        const result = await axios.post(`http://localhost:4000/signin`,{
            email:email,
            password:password,
            user:user
        })
        console.log(result.data)
        if(result.data==="error"){
            Swal.fire({
                icon: 'error',
                title:'done',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/login');
        }
        else{
            Swal.fire({
                icon: 'success',
                title:'done',
                text: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
          })
            localStorage.setItem('id',parseInt(result.data));
            if(user==="vendor")
                navigate('/vendor/addnews')
            else if(user==="customer")
                navigate('/customer/home')
            else if(user==="ndb")
                navigate('/ndb/customerlist');
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
                        <Typography component="h4" variant="h4" className={classes.SignUp}>SIGN IN</Typography>
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
                                sx={{ width: '44ch',marginLeft:"27%",marginTop:"20px",backgroundColor:"#e85a4f"}}
                                variant="contained"
                                
                                onClick={submit}>
                                Sign IN
                            </Button>
                    </Grid>
    
                    <Grid item lg={1}>
                        <Link href="/signup" variant="body2" color="#e85a4f">
                            {"Don't have an account? Sign UP"}
                        </Link>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Login;