
import { makeStyles } from '@mui/styles';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';import MenuItem from '@mui/material/MenuItem';
import { Button, ClickAwayListener } from '@mui/material';
import Swal from 'sweetalert2';
const axios = require("axios");



const useStyles = makeStyles({
    main:{
        textAlign:"center"
    },
    list:{
        backgroundColor:"#C6F3BF"
    }
})
const Addnews = ()=>{

    const classes = useStyles();
    const navigate = useNavigate();

    const [allnews,setAllnews]=useState([])
    const [newspaper,setNewspaper]=useState([]);
    const [single,setSingle]=useState({name:"",nid:""});
    const [flag,setFlag] = useState(false)
    
    const id = localStorage.getItem('id');


    useEffect(() => {
        axios.get('http://localhost:4000/addnews')
            .then(res => setAllnews(res.data))
        
        axios.get(`http://localhost:4000/addnews/${id}`)
        .then(
                res => 
                {
                    if(res.data!=="empty"){
                        setNewspaper(res.data)
                        setFlag(true)
                    }
                }
            )
    }, [])
    
    const submit = async(e)=>{
            e.preventDefault();
            const result = await axios.post('http://localhost:4000/addnews',
            {newspaper:newspaper,
             id:id}) 
             Swal.fire({
                icon: 'success',
                title:'done',
                text: 'Submitted successfully',
                showConfirmButton: false,
                timer: 1500
            })
            window.location.reload(true);
        }

    return(
        <div className={classes.main}>       
                <Table aria-label="simple table" className={classes.list} style={{ width: "50%"  }} sx={{margin:"auto" , marginTop:"30px"}}>
                     <TableHead>
                            <TableRow>
                                <TableCell  sx={{textAlign:"center",backgroundColor:"#FF6D7F",fontSize:"20px"}}>NEWSPAPER LIST</TableCell>
                            </TableRow>
                     </TableHead>
                     <TableBody>
                        {newspaper.map((e) => (
                        <TableRow key={e.name}>
                            <TableCell sx={{textAlign:"center" , fontSize:"20px",fontFamily:"sans-serif"}} >{e.name}</TableCell>
                        </TableRow>
                        ))}
                     </TableBody>
                </Table>
           {/* </TableContainer> */}
    
            {!flag && 
            <div>
                <Typography variant="h5" sx={{marginTop:"30px"}}>FORM</Typography>
                <TextField
                    id="outlined-select-news"
                    select
                    margin="normal"
                    sx={{width:"50ch" , marginLeft:"auto" , marginRight:"auto" , marginTop:"40px"}}
                    label="Select the newspaper"
                    value={single}
                    onChange={(e)=>setSingle(e.target.value)}
                    >
                    {allnews.map((option) => (
                        <MenuItem key={option.name} value={option}>
                        {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            
                <div>
                    <Button
                        sx={{ width: '50ch',marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}}
                        variant="outlined"
                        onClick={()=>setNewspaper(prev=>[...prev,single])}>
                        Click here to add to the list
                    </Button> 
                </div>  
                <div>
                    <Button
                        sx={{ width: '50ch',marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"60px"}}
                        variant="contained"
                        onClick={submit}
                        disabled={flag}>
                        Submit the list
                    </Button> 
                </div>     
            </div>
            }
    </div>

    )
}

export default Addnews;