import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {Button,CardActionArea, CardActions } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
    root:{
        paddingLeft:"220px",
        paddingRight:"80px",
        paddingTop:"30px",
        paddingBottom:"30px"
    }
})



const Home = ()=>{

    const classes = useStyles();
    const [newspapers,setNewspapers] = useState([{name:"",n_id:"",description:"",scrap_price:0,isFlipped:false}])
    // const [isFlipped,setIsFlipped] = useState(false)
  

    const getData = async()=>{
        const result = await  axios.get(`http://localhost:4000/customer/home`)
        setNewspapers(result.data)
        console.log(newspapers)
    }

    const handleChange = id => e=>{
        let newArr = [...newspapers]
        newArr[id-1].isFlipped= !newspapers[id-1].isFlipped
        setNewspapers(newArr)
    }
    useEffect(()=>{
        getData();
    },[])

    const navigate = useNavigate();
    const submit = async(e)=>{
        navigate('/customer/profile')
    }

    return(
        <div style={{minHeight:"100vh"}}>
            <Header />
            <Grid container spacing={5} className={classes.root}>
               
                {newspapers.map(n=>{
                    return(
                        <Grid item xs={12} sm={6} md={2.5} key={n.n_id}>
                                <Card key ={n.n_id}
                                style={{height:"350px" , backgroundColor:"#CCCFFB"}}
                                onMouseEnter={handleChange(n.n_id)}
                                onMouseLeave={handleChange(n.n_id)}>                                    
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
                  <Button
                                type="submit"
                                margin="normal"
                                sx={{ width: '44ch',marginLeft:"27%",marginTop:"20px"}}
                                variant="contained"
                                onClick={submit}>
                                Subscribe
                            </Button>  
                </Grid>      
           
           
        </div>
    )
}

export default Home;