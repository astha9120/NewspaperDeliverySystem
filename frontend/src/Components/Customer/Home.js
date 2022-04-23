import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { borders } from '@mui/system';
import {Button,CardActionArea, CardActions, getInitColorSchemeScript } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';




const useStyles = makeStyles({
    h_root:{
        paddingLeft:"180px",
        paddingRight:"80px",
        paddingTop:"30px",
        paddingBottom:"60px",
        backgroundColor:" #eae7dc"
    },
    h_menu:{
        minWidth:"30px"
    },
    
})


const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
        width: '39ch'
      }
  })

const Home = ()=>{

    const classes = useStyles();
    const navigate = useNavigate();
    const id = localStorage.getItem("id")
    const [no,setNo]=useState(6);
    const [flag_load,setFlag_load]=useState(false)
    const [newspapers,setNewspapers] = useState([{name:"",n_id:-1,description:"",scrap_price:0,isFlipped:false}])
    const [bool,setBool] = useState(true)
    // const [isFlipped,setIsFlipped] = useState(false)
   
   
    const getFormattedPrice = (price) => `₹${price.toFixed(2)}`;
    const slice = newspapers.slice(0,no)
    
    


    const loadMore =async ()=>{
        if(no+3>=newspapers.length)
            setFlag_load(true)
        setNo(no+3)
        
    }

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

    useEffect(()=>{
        getData();
    },[])

    return(
        <div style={{minHeight:"100vh",backgroundColor:" #eae7dc"}} > 
            <Header />

                

            {bool && <Typography align="center" variant="h3" style={{paddingTop:"50px",paddingBottom:"40px",color:"#e85a4f"}} fontFamily= 'Playfair Display,serif' fontSize="60px" fontWeight="400"  boxSizing="border-box">Newspapers List</Typography> }
            {!bool &&
                <Typography align="center" variant="h2" style={{paddingTop:"150px",paddingBottom:"20px",color:"#e85a4f",fontFamily:'Playfair Display,serif'}}>
                    This Service is not available in your city
                </Typography>
            }
            
            <Grid container spacing={5} className={classes.h_root}>   
               {bool && 
                    slice.map(n=>{
                    return(
                        <Grid item xs={12} sm={6} md={4} key={n.n_id}>      
                                <Card key ={n.n_id}
                                className={classes.button_c}
                                style={{width:"300px", height:"330px",display:"inherit"}}
                                onMouseEnter={handleEnter(n.n_id)}
                                onMouseLeave={handleLeave(n.n_id)}>                                    
                                    <ReactCardFlip isFlipped={n.isFlipped} flipDirection="horizontal">
                                        <div >
                                            <CardActionArea>
                                                <CardMedia
                                                component="img" 
                                                className={classes.media}
                                                image={`../newspaper/${n.n_id}.jpg`}
                                                alt={n.name}
                                                title={n.name}/>
                                                
                                                <CardContent> 
                                                    <Typography gutterBottom variant="h6" component="div" align="center" fontWeight={"bold"} fontFamily= 'Nunito,sans-serif'>
                                                        {n.name}   
                                                    </Typography>      
                                                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div" align="center" fontWeight={"bold"} fontFamily= 'Nunito,sans-serif'>
                                                        Price : {getFormattedPrice(n.price*30+20)} - {getFormattedPrice(n.price*30+50)}
                                                    </Typography>
                                                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div" align="center" fontWeight={"bold"} fontFamily= 'Nunito,sans-serif'>
                                                        Scrap price : {getFormattedPrice(n.scrap_price)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </div>
                                        <div>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="p" component="div"  fontFamily= 'Nunito,sans-serif'>
                                                    {n.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </div>
                                    </ReactCardFlip> 
                                </Card>
                    
                            </Grid>
                    )})
                }
            </Grid>
    

            {bool && <StyledButton  type="submit" variant="contained"
                sx={{ width: '39ch',color:"black",backgroundColor:"#e98074",marginLeft:"610px",marginBottom:"20px"}}
                onClick={()=>loadMore()} disabled={flag_load}
                className = {classes.h_subscribe}>
                Load more...
            </StyledButton>}
        </div>
    )
}

export default Home;