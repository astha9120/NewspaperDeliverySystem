import { Typography } from "@material-ui/core";
import Header from "./Header";
import { useState ,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const axios = require("axios")

const useStyles = makeStyles({
    bill:{
        textAlign:"center",
        paddingTop:"40px",
        paddingBottom:"30px",
    }
})

const  BillCollection=()=>{
    const classes = useStyles();
    const navigate = useNavigate();
    const [bill,setBill]= useState([{name:"",bill:0,address:"",area:"",bill_status:0,o_id:-1}])
    const [billCollected,setBillCollected]=useState([{name:"",bill:0,address:"",area:"",collection_date:"",o_id:-1}])
    const id = localStorage.getItem('id')
    

    const getBills=async()=>{
        const result = await axios.get(`http://localhost:4000/ndb/billcollection/${id}`)
        console.log("yet to be collected")
        console.log(result.data)
        setBill(result.data)
    }

    const collect = o_id => async(e)=>{

        const willDelete = await Swal.fire({
            icon: 'success',
            title:'Are you sure?',
            text: "You won't be able to revert this",
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, collect it!',
            timer: 15000
        }).then((result)=>{
                if (result.isConfirmed){
                    Swal.fire(
                    'Collected!',
                    'Bill has been collected.',
                    'success'
                    )

                axios.put(`http://localhost:4000/ndb/billcollection/${o_id}`)
                .then(res=>{
                    console.log("collect button click")
                    console.log(res.data)
                })
            }   
        })
        //console.log(willDelete)
            // if (willDelete) {
            //   swal("Poof! Your imaginary file has been deleted!", {
            //     icon: "success",
            //   });
            // } else {
            //   swal("Your imaginary file is safe!");
            // }
          
           // axios.put(`http://localhost:4000/ndb/billcollection/${o_id}`)
                    // .then(res=>{
                    //         console.log("collect button click")
                    //         console.log(res.data)
                    //     })
                    //console.log(result.data)
        
        window.location.reload(true)
    }

    const bill_collected = async()=>{
        let  date = new Date()
        const month = date.getMonth();
        date.setMonth(month-1)
        date = date.toJSON().slice(0,10).replace(/-/g,'-')

        const result = await axios.get(`http://localhost:4000/ndb/billcollection/${id}/${date}`)
        console.log("collected bill")
        console.log(result.data)
        setBillCollected(result.data)
    }

    useEffect(()=>{
        getBills()
        bill_collected()
    },[])


    return(
        <div style={{minHeight:"100vh",backgroundColor:"#E8E9FD"}}>
            <Header></Header>
            <Typography variant="h2" className={classes.bill}>Bill Collection</Typography>
            <Table aria-label="simple table" sx={{marginLeft:"25%",width:"50%"}}>
                <TableHead>
                    <TableRow style={{backgroundColor:"#FF6D7F"}}>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Name</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Address</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Price</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor:"#C6F3BF"}}>
                    {bill.map((e) => (
                        <TableRow key={e.o_id} >
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.name}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.address}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.bill}</TableCell>
                            <Button  sx= {{marginLeft:"20%",marginTop:"5px"}} type="submit" 
                                variant="outlined" onClick={collect(e.o_id)}>
                                Collect
                            </Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography variant="h2" className={classes.bill}>Bill Collected</Typography>
            <Table aria-label="simple table" sx={{marginLeft:"25%",width:"50%"}}>
                <TableHead>
                    <TableRow style={{backgroundColor:"#FF6D7F"}}>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Name</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Address</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Price</TableCell>
                        <TableCell  sx={{textAlign:"center",fontSize:"14px",fontWeight:"bold",color:"white"}}>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor:"#C6F3BF"}}>
                    {billCollected.map((e) => (
                        <TableRow key={e.o_id} >
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.name}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.address}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.bill}</TableCell>
                            <TableCell sx={{textAlign:"center" , fontSize:"14px"}} >{e.collection_date.substring(0,10)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default BillCollection;