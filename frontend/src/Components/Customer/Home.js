import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {Button,CardActionArea, CardActions } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';


const useStyles = makeStyles({
    root:{
        paddingLeft:"220px",
        paddingRight:"80px",
        paddingTop:"30px",
        paddingBottom:"30px"
    },
    subscribe:{
        fontFamily: "Lato, sans-serif",
    },
    menu:{
        minWidth:"30px"
    }
})



const Home = ()=>{

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [noti,setNoti] = useState([]);
    const [n_len,setN_len]= useState(0);
    const id = localStorage.getItem("id")
    const [newspapers,setNewspapers] = useState([{name:"",n_id:-1,description:"",scrap_price:0,isFlipped:false}])
    const [bool,setBool] = useState(true)
    // const [isFlipped,setIsFlipped] = useState(false)
    const open = Boolean(anchorEl);
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const getData = async()=>{
        const result = await  axios.get(`http://localhost:4000/customer/home/${id}`)
        console.log(result.data)
        if(result.data.length==0)
            setBool(false)
        setNewspapers(result.data)
       // console.log(newspapers)
    }

    const handleEnter = id => e=>{
        let newArr = [...newspapers]
        for(let i=0;i<newspapers.length;i++){
            if(newspapers[i].n_id==id){
                newArr[i].isFlipped=true
                break;
            }
        }
        setNewspapers(newArr)
    }

    const handleLeave = id => e=>{

        let newArr = [...newspapers]
        for(let i=0;i<newspapers.length;i++){
            if(newspapers[i].n_id==id){
                newArr[i].isFlipped=false
                break;
            }
        }
        setNewspapers(newArr)
        
    }
    
    const getNoti = () =>{
        console.log("Inside Noti")
            axios.get(`http://localhost:4000/customer/home/daily/${id}`)
            .then(res=>{
                console.log("Notifications")
                setNoti(res.data)
                console.log(noti)
                setN_len(res.data.length)
            })
    }

    useEffect(()=>{
        getData();
        getNoti();
    },[])

    
    const submit = async(e)=>{
        navigate('/customer/profile')
    }

    const MarkRead = ()=>{
        console.log("inside mark read")
        axios.post(`http://localhost:4000/customer/home/daily/${id}`)
        .then(res=>{
            console.log(res)
            setNoti([])
            window.location.reload(true)
        })

    }
    return(
        <div style={{minHeight:"100vh"}}>
            <Header />
            <Button   type="submit"
                    sx={{ width: '44ch',marginLeft:"40%",color:"black",marginTop:"20px",fontWeight:"bolder"}}
                    onClick={()=>navigate('/customer/profile')}
                    className = {classes.subscribe}>
                    Click Here to Subscribe to newspapers
            </Button>
            
            <Badge marginLeft="20%" badgeContent={n_len} color="primary">
                <NotificationsIcon color="action"  
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} />
            </Badge>
            <Menu
                
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
               
            >
                {noti.map(e=>{
                    return ( <MenuItem >{e}</MenuItem>)
                    })
                }
                
                { noti.length ? <MenuItem><Button onClick = {MarkRead}>Mark As Read</Button></MenuItem> : <MenuItem>No new Notifications</MenuItem>}
            </Menu>
            <Typography align="center" variant="h5" style={{paddingTop:"20px",fontWeight:"bold",color:"#B939A4"}}>Newspapers List</Typography> 
            {!bool &&
                    <Typography align="center" variant="h5" style={{paddingTop:"70px"}}>Sorry! This Service Is not available in Your City</Typography>
            }
            <Grid container spacing={5} className={classes.root}>
               
               {bool && 
                    newspapers.map(n=>{
                    return(
                        <Grid item xs={12} sm={6} md={2.5} key={n.n_id}>
                                <Card key ={n.n_id}
                                style={{height:"350px" , backgroundColor:"#CCCFFB"}}
                                onMouseEnter={handleEnter(n.n_id)}
                                onMouseLeave={handleLeave(n.n_id)}>                                    
                                    <ReactCardFlip isFlipped={n.isFlipped} flipDirection="horizontal">
                                        <div >
                                            <CardActionArea>
                                                <CardHeader title={n.name} align="center"
                                                titleTypographyProps={{variant:'h6'}}
                                                style={{backgroundColor:"#2148C0" , color:"white"}}/>
                                                
                                                <CardMedia
                                                component="img" 
                                                className={classes.media}
                                                image={`../newspaper/${n.n_id}.jpg`}
                                                alt={n.name}
                                                title={n.name}/>
                                                
                                                <CardContent>       
                                                    <Typography gutterBottom variant="body" component="div" align="center" fontWeight={"bold"}>
                                                    Price : {n.price*30+20} - {n.price*30+50}    
                                                    </Typography>
                                                    <Typography gutterBottom variant="body" component="div" align="center" fontWeight={"bold"}>
                                                    Scrap_price : {n.scrap_price}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </div>
                                        <div>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="p" component="div">
                                                    {n.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </div>
                                    </ReactCardFlip> 
                                </Card>
                            </Grid>
                    )
                })} 
                 
                </Grid>      
               
        </div>
    )
}

export default Home;