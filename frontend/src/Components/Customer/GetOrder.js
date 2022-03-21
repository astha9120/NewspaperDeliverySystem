import Header from "./Header";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



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

    return(
        <div style={{minHeight:"100vh",backgroundColor:"#E8E9FD"}}>
            <Header></Header>
            <Grid container component="main" marginTop="80px" paddingLeft="25%" minHeight="50vh">
                <Grid item  lg={4} md={3} xs={2}  sx={{backgroundColor:"#C4C4C4"}}>
                    <Typography style={{paddingTop:"15px",paddingLeft:"30px",fontWeight:"bold",fontSize:"18px"}}>Account Details</Typography>
                    <Typography style={{paddingTop:"30px",paddingLeft:"70px"}}>Name : {obj.name} </Typography>
                    <Typography style={{paddingTop:"5px",paddingLeft:"70px"}}>Address : {obj.address}</Typography>
                    <div className={classes.subscription} >
                        <Typography style={{fontWeight:"bold",paddingBottom:"10px"}}>Subscription Info</Typography>
                        <Typography>Start Date : {obj.date.substring(0,10)}</Typography>
                        <Typography>Days : 30</Typography>
                        <Typography>Scraping Service : {bool}</Typography>
                    </div>     
                </Grid>
                <Grid item  lg={4} md={3} xs={2}  sx={{backgroundColor:"#CCCFFB"}}>
                    <Typography style={{paddingTop:"15px",paddingBottom:"20px",paddingLeft:"30px",fontWeight:"bold",fontSize:"18px"}}>Order Info</Typography>
                    <Table aria-label="simple table">
                            <TableHead>
                                    <TableRow>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Newspaper</TableCell>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Price</TableCell>
                                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>Scrap_price</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {papers.map((e) => (
                                <TableRow key={e.name}>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.name}</TableCell>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.price}</TableCell>
                                    <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.scrap_price}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                    <Typography paddingLeft="30%" paddingTop="40px">Total Price :  {total}</Typography>
                    <Typography paddingLeft="30%" paddingTop="5px">Scrap Price : {scrap}</Typography>
                    <Typography paddingLeft="30%" paddingTop="5px">Amount to be paid : {total - scrap*obj.scrap_service}</Typography>
                    <Typography paddingLeft="30%" paddingTop="5px" paddingBottom="30px">Payment Method : COD</Typography>
                </Grid>
            </Grid>
            <Button variant="contained" style={{marginLeft:"48%",marginTop:"10px"}}
            onClick = {()=>navigate('/customer/pastorder')}
            >Back</Button>
        </div>
    )
}

export default GetOrder;