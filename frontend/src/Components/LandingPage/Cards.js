import React, { useState } from "react";
import './Cards.css';

import Popup from 'reactjs-popup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';

import "./Modal.css";
const useStyles = makeStyles({
  land:{
    display:"flex",
    justifyContent:"space-between",
    marginTop:"70px"

  }
})
function Cards() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toggleModal3 = () => {
    setModal3(!modal3);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if(modal2) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if(modal3) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const classes = useStyles()
  return (
    <div className='cards'>
      <h1>How It Works!</h1>
      
       <>
       <div className={classes.land}>
       <Card sx={{ width: 400 }}>
      <CardActionArea className="close-modal" onClick={toggleModal}>
        <CardMedia
          component="img"
          height="250"
          image="/images/customer.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Customer
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>

    <Card sx={{ width: 400}}>
      <CardActionArea className="close-modal" onClick={toggleModal2}>
        <CardMedia
          component="img"
          height="250"
          image="/images/ndb.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Delivery Person
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>

    <Card sx={{ width: 400 }}>
      <CardActionArea className="close-modal" onClick={toggleModal3}>
        <CardMedia
          component="img"
          height="250"
          image="/images/vendor.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Vendor
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>
       </div>
     

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <Card sx={{ width: 400 }}>
      <CardActionArea  >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Customer
          </Typography>
           <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Button className="close-modal" onClick={toggleModal}>
              CLOSE
            </Button>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>
           
          </div>
         
        </div>
      )}

{modal2 && (
        <div className="modal">
          <div onClick={toggleModal2} className="overlay"></div>
          <div className="modal-content">
          <Card sx={{ width: 400 }}>
      <CardActionArea  >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
           Delivery Person
          </Typography>
           <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Button className="close-modal" onClick={toggleModal2}>
              CLOSE
            </Button>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>
           
          </div>
         
        </div>
      )}

{modal3 && (
        <div className="modal">
          <div onClick={toggleModal3} className="overlay"></div>
          <div className="modal-content">
          <Card sx={{ width: 400 }}>
      <CardActionArea  >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Vendor
          </Typography>
           <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Button className="close-modal" onClick={toggleModal3}>
              CLOSE
            </Button>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>
           
          </div>
         
        </div>
      )}
      
    </>
    </div>
  );
}

export default Cards;
