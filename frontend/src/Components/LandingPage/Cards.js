import React, { useState } from "react";

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
    marginTop:"80px" ,
    marginBottom:"100px"
  },
  cards :{
    padding: "4rem",
    background: "#fff",
    fontFamily:'Playfair Display,serif'
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
    <div className={classes.cards}>
      <h1 style={{fontSize:"50px",marginTop:"40px"}} align="center"> HOW IT WORKS!</h1>
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
                  <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
                  Customer
                  </Typography>
              </CardContent>
           </CardActionArea>
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
          <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
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
          <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
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
      <CardMedia
          component="img"
          height="250"
          image="/images/customer.png"
          alt="Customer"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
            Customer
          </Typography>
           <Typography variant="body2" color="text.secondary">
           
           Sign-up and Login giving all the necessary information.
           Browse Newspapers available in your area
           Click on subscribe and give your address for Delivery.
           Can view your bill and all your past orders anytime.
           Website will notify your newspaper delivery everyday.
         
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
      <CardMedia
          component="img"
          height="250"
          image="/images/ndb.png"
          alt="Delivery Person"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
           Delivery Person
          </Typography>
           <Typography variant="body2" color="text.secondary">
           Sign-up and Login giving all the necessary information.
           The account will be verified by the admin to confirm the employment.
           After verification the user will be able to see the vendor assigned to them according to the minimum distance between user and the vendor.
           Customer will be assigned gradually and user will be able to see their order and addresses.
           Daily notification has to be sent by the user to all the customers to confirm the delivery.
           Bill information has to be updated regularly according to the bill collection status.
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
      <CardMedia
          component="img"
          height="250"
          image="/images/vendor.png"
          alt="vendor"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" fontFamily="Playfair Display,serif">
            Vendor
          </Typography>
           <Typography variant="body2" color="text.secondary">
           Sign-up and Login giving all the necessary information.
           Browse Newspapers available in your area
           Click on subscribe and give your address for Delivery.
           Can view your bill and all your past orders anytime.
           Website will notify your newspaper delivery everyday.
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
