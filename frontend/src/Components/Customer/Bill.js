import Header from "./Header";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState ,useEffect,useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';
import  img1 from './newsDaily.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from "react-to-print"
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
        width: '17%'
      }
  })

const Bill = ()=>{

    const classes = useStyles();
    const navigate = useNavigate();
    const [obj,setObj] = useState({name:"",address:"",area:"",date:"",scrap_service:-1,o_id:-1})
    const [papers,setPapers]= useState([{name:"",price:0,scrap_price:0}])
    const id = localStorage.getItem("id")
    const [bool,setBool] = useState("No")
    const [total,setTotal] = useState(0)
    const [scrap,setScrap] = useState(0)
    const [bill_stat,setBill_stat] = useState("Your bill has not been collected yet")
    const [page,setPage] = useState(false)
    const componentRef = useRef();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    
    const getCustomer = async()=>{
        const result = await axios.get(`${process.env.REACT_APP_URL}/customer/bill/${id}`)
        setObj(result.data[0]);
        if(result.data.length>0){
            setPage(true)
            console.log(result.data[0])
            if(result.data[0].bill_status===1)
                setBill_stat("Your bill has been collected")
            if(result.data[0].scrap_service==1)
                setBool("Yes")
            
            const result2 = await axios.get(`${process.env.REACT_APP_URL}/customer/bill/${id}/${result.data[0].o_id}`)
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
        
    }

    useEffect(()=>{

        getCustomer();

    },[])
    

    return(
        <div style={{minHeight:"100vh", backgroundColor: "#e98074"}}>
            <Header></Header>
            {!page &&
                    <Typography align="center" variant="h4" style={{paddingTop:"150px",paddingBottom:"30px",color:"white",fontFamily:'Playfair Display,serif'}}>
                        No Order has been placed Yet!
                    </Typography>
            }
             {!page &&
                     <Typography align="center" variant="h4" style={{paddingBottom:"20px",color:"white",fontFamily:'Playfair Display,serif'}}>
                     Subscribe to NewsDaily and get your desired newspaper ASAP.
                     </Typography>
            }

           
        
            {page &&
            
             <Grid container component="main" direction="column" marginTop="65px" paddingLeft="15%" paddingRight="15%"  minHeight="50vh" ref={componentRef}>

                 
            <Grid item  lg={4} md={3} xs={2}  sx={{backgroundColor:" white"}} >
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <img src={img1} className={classes.image}/>
                <div >
                    <Typography style={{paddingTop:"30px",fontWeight:"bold",fontSize:"16px",paddingRight:"40px"}} >INVOICE</Typography>
                    <Typography style={{fontWeight:"500",fontSize:"16px",color:"grey",paddingBottom:"25px",paddingRight:"40px"}} >#{obj.o_id}</Typography>
                </div>
               
                </div>
                <Divider  sx={{ width: '92%',marginTop:"27px",height:"2px",marginLeft:"4%",marginBottom:"10px",backgroundColor:"grey"}} />
                <div style={{display:"flex", justifyContent:"space-between", paddingBottom:"30px" }}>
                    <div style={{paddingLeft: '40px'}}>
                    <Typography style={{fontWeight:"bold",fontSize:"23px",paddingTop:"25px",paddingBottom:"15px"}} fontFamily= 'Playfair Display'>Bill To</Typography>
                    <Typography style={{fontWeight:"600",paddingBottom:"5px",fontSize:"20px"}} fontFamily= 'Nunito,sans-serif'> {obj.name} </Typography>
                    <Typography style={{fontSize:"19px"}} color="text.secondary" variant="body"  fontWeight={"bold"}  fontFamily= 'Nunito,sans-serif' >{`${obj.address} ${obj.area}`}</Typography>
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
                                        <TableCell  sx={{backgroundColor:"#d3d3d3",textAlign:"right",fontSize:"16px",fontWeight:"bold",fontFamily:"Playfair Display"}}>Price ($)</TableCell>
                                        <TableCell  sx={{backgroundColor:"#d3d3d3",textAlign:"right",fontSize:"16px",fontWeight:"bold",fontFamily:"Playfair Display"}}>Scrap Price ($)</TableCell>
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
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >${total}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Scrap Discount</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >${scrap}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{textAlign:"left" , fontSize:"14px",fontFamily: 'Nunito,sans-serif',fontWeight:"600",border:"none"}} >Total</TableCell>
                                    <TableCell sx={{textAlign:"right" , fontSize:"14px",fontFamily:'Nunito,sans-serif',fontWeight:"600",border:"none"}} >${total - scrap*obj.scrap_service}</TableCell>
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
               
            </Grid> }
            {page &&<StyledButton   type="submit" variant="contained"
                    sx={{ width: '17%',marginLeft:"22%",color:"black",marginTop:"50px",backgroundColor:" #eae7dc",fontWeight:"bold"}}
                    onClick={()=>navigate('/customer/pastorder')}>
                    Past Orders
            </StyledButton>}
            { page && <ReactToPrint
                trigger={()=><StyledButton  type="submit" variant="contained"
                                sx={{ width: '17%',color:"black",backgroundColor:" #eae7dc",
                                    marginLeft:"20%",marginTop:"50px",fontFamily:'Nunito,sans-serif',fontWeight:"bold"}}>
                                Print E-Receipt 
                                <PrintIcon></PrintIcon>
                            </StyledButton>}
                content={()=> componentRef.current}/>
            } 
            {page && <Typography align="center" marginTop="45px" paddingTop="5px"
                paddingBottom="5px" backgroundColor="white" color="black">
                {bill_stat}
            </Typography>}
        </div>
    )
}

export default Bill;