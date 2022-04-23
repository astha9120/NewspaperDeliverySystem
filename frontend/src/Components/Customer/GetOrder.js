import Header from "./Header";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import  img1 from './newsDaily.png'
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';




const axios = require("axios")


const useStyles = makeStyles({
    subscription:{
        backgroundColor:"white",
        width:"70%",
        marginLeft:"15%",
        borderRadius:"20px",
        textAlign:"center",
        paddingTop:"20px",
        paddingBottom:"20px",
        marginTop:"80px"
    },
    image:{
        paddingTop:"30px",
        paddingLeft:"40px",
        height:"80px"
    }
})

const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#9C9A93',
        boxShadow: '20',
        width: '20%'
      }
  })


const GetOrder = (e)=>{
    console.log("order")
    const { id } = useParams();
    console.log(id)
    const classes = useStyles();
    const navigate = useNavigate();
    const [obj,setObj] = useState({name:"",address:"",area:"",date:"",scrap_service:-1,o_id:-1})
    const [papers,setPapers]= useState([{name:"",price:0,scrap_price:0}])
    const c_id = localStorage.getItem("id")
    const [bool,setBool] = useState("No")
    const [total,setTotal] = useState(0)
    const [scrap,setScrap] = useState(0)
    
    const getCustomer = async()=>{
        const result = await axios.get(`http://localhost:4000/customer/getorder/p/${c_id}/${id}`)
        setObj(result.data[0]);
        console.log(result.data[0])
        if(result.data[0].scrap_service==1)
            setBool("Yes")
        
        const result2 = await axios.get(`http://localhost:4000/customer/getorder/${c_id}/${id}`)
        //console.log(result2.data)
        setPapers(result2.data)

        let p=0,q=0;
        for(let i=0;i<result2.data.length;i++){
            p+=result2.data[i].price
            q+=result2.data[i].scrap_price
        }
        setTotal(p)
        if(result.data[0].scrap_service==1)
            setScrap(q)
    }

    useEffect(()=>{

        getCustomer();

    },[])
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return(
    <div style={{minHeight:"100vh", backgroundColor: "#e98074"}}>
        <Header></Header>
       
         
        <Grid container component="main" direction="column" marginTop="80px" paddingLeft="15%" paddingRight="15%"  minHeight="50vh">

        <Grid item  lg={4} md={3} xs={2}  sx={{backgroundColor:" white"}}>
            <div style={{display:"flex"}}>
            <img src={img1} className={classes.image}/>
            <Typography style={{paddingTop:"26px",paddingLeft:"30px",fontWeight:"bold",fontSize:"16px",fontWeight:"bold",marginLeft:"60%",paddingBottom:"25px"}} >INVOICE<br></br><span style={{fontWeight:"500",color:"grey",fontSize:"14px",paddingLeft:"8px"}}>#{obj.o_id}</span></Typography>
           
            </div>
            <Divider  sx={{ width: '92%',marginTop:"27px",height:"2px",marginLeft:"4%",marginBottom:"10px",backgroundColor:"grey"}} />
            <div style={{display:"flex", justifyContent:"space-between", paddingBottom:"30px" }}>
                <div>
                <Typography style={{fontWeight:"bold",fontSize:"23px",paddingLeft:"40px",paddingTop:"25px",paddingBottom:"15px"}} fontFamily= 'Playfair Display'>Bill To</Typography>
                <Typography style={{paddingLeft:"40px",fontWeight:"600",paddingBottom:"5px",fontSize:"20px"}} fontFamily= 'Nunito,sans-serif'> {obj.name} </Typography>
                <Typography style={{paddingLeft:"40px",fontSize:"19px"}} color="text.secondary" variant="body"  fontWeight={"bold"}  fontFamily= 'Nunito,sans-serif' >{obj.address}</Typography>
                </div>
                <div>
                <Typography style={{fontWeight:"bold",fontSize:"23px",paddingTop:"25px",paddingBottom:"15px",paddingRight:"40px"}} fontFamily= 'Playfair Display'>Subscription Details</Typography>
                <Typography style={{fontWeight:"600",paddingBottom:"5px",fontSize:"16px"}} fontFamily= 'Nunito,sans-serif'> Start Date : {obj.date.substring(0,10)}</Typography>
                <Typography style={{fontWeight:"600",paddingBottom:"5px",fontSize:"16px"}} fontFamily= 'Nunito,sans-serif'>Days : 30</Typography>
                <Typography style={{fontWeight:"600",paddingBottom:"5px",fontSize:"16px"}} fontFamily= 'Nunito,sans-serif'>Scraping Service : {bool}</Typography>
                   
                    </div>
                    </div>
            </Grid>
            <Grid item  lg={4} md={3} xs={2}  sx={{backgroundColor:"white",paddingTop:"50px"}}>
                
                <Table aria-label="simple table" sx={{width:"60%",marginLeft:"20%"}}>
                        <TableHead>
                                <TableRow>
                                    <TableCell  sx={{backgroundColor:"#d3d3d3",textAlign:"left",fontSize:"16px",fontWeight:"bold",fontFamily:"Playfair Display"}} >Newspaper</TableCell>
                                    <TableCell  sx={{backgroundColor:"#d3d3d3",textAlign:"right",fontSize:"16px",fontWeight:"bold",fontFamily:"Playfair Display"}}>Price (₹)</TableCell>
                                    <TableCell  sx={{backgroundColor:"#d3d3d3",textAlign:"right",fontSize:"16px",fontWeight:"bold",fontFamily:"Playfair Display"}}>Scrap Price (₹)</TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {papers.map((e) => (
                            <TableRow key={e.name}>
                                <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600"}} >{e.name}</TableCell>
                                <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily: 'Nunito,sans-serif,fontWeight:"600"'}} >{e.price}</TableCell>
                                <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600"}} >{e.scrap_price}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                </Table>
                <Divider  sx={{ width: '92%',marginTop:"27px",height:"2px",marginLeft:"4%",marginBottom:"10px",backgroundColor:"grey",marginTop:"70px"}} />
         
                <div style={{display:"flex",justifyContent:"end",marginRight:"210px"}}>
                    <Table aria-label="simple table" sx={{width:"37%"}}>
                            <TableBody >
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Sub Total</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >₹{total}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Scrap Discount</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >₹{scrap}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Total</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >₹{total - scrap*obj.scrap_service}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Payment Method</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >COD</TableCell>
                                </TableRow>
                            
                            </TableBody>
                    </Table>
                    </div>
                <Divider  sx={{ width: '92%',height:"2px",marginLeft:"4%",backgroundColor:"grey",paddingTop:"20px"}} />
             
                <Typography sx={{marginTop:"10px"}} fontFamily='Nunito,sans-serif' align="center" color="text.secondary" variant="body2">
                   @Made by NewsDaily on {yyyy + '-' + mm + '-' + dd}
                </Typography>
           
            </Grid>
           
        </Grid> 
       <StyledButton   type="submit" variant="contained"
                sx={{ width: '20%',marginLeft:"40%",color:"black",marginTop:"30px",marginBottom:"30px",backgroundColor:" #eae7dc",borderRadius:"13px"}}
                onClick = {()=>navigate('/customer/pastorder')}>
                Back
        </StyledButton>
       
    </div>
)
}

export default GetOrder;