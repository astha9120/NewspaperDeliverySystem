import { Typography } from "@material-ui/core";
import Header from "./Header";
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import GetOrder from './GetOrder'
import { useNavigate } from 'react-router-dom';



const axios = require("axios")

const useStyles = makeStyles({
   past:{
        paddingTop:"30px",
        paddingBottom:"20px"
   }
})


const PastOrders = ()=>{

    const classes = useStyles();
    const [orders,setOrders]= useState([{date:"",newspaper:[],bill:0,bill_status:0,o_id:-1}])
    const navigate = useNavigate();
    const id = localStorage.getItem('id')

    const getOrders = async()=>{
        const result = await axios.get(`http://localhost:4000/customer/pastorder/${id}`)
        console.log(result.data)
        setOrders(result.data)
    }
    
    useEffect(()=>{
        getOrders()
    },[])


    return(
        <div style={{minHeight:"100vh",backgroundColor:"#E8E9FD"}}>
            <Header/>
            <Typography align="center" variant="h4" className={classes.past}>Past Orders</Typography>
            <Table aria-label="simple table" sx={{marginLeft:"25%",width:"50%"}}>
                <TableHead>
                    <TableRow style={{backgroundColor:"#828282"}}>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px"}}>Date</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px"}}>Duration</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px"}}>Price</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px"}}>Status</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px"}}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor:"#C6F3BF"}}>
                    {orders.map((e) => (
                        <TableRow key={e.o_id} >
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.date.substring(0,10)}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >30</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.bill}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.bill_status==1 ? "Paid" : "Pending"}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >
                                <Button onClick={()=>{navigate(`/customer/order/${e.o_id}`)}}>Click</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


export default PastOrders;