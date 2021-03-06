import  img1 from './newsDaily.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';

import {
  AppBar,
  Toolbar,  
  IconButton,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";



const headersData = [
  {
    label: "Home",
    href: "/customer/home",
  },
  {
    label: "About",
    href: "/customer/aboutus",
  },
  {
    label: "Bill",
    href: "/customer/bill",
  },
  {
    label: "Orders",
    href: "/customer/pastorder",
  },
  {
    label: "Delivery Person",
    href: "/customer/getndb",
  },
  {
    label: "LogOut",
    href: "/",
  },
];

const useStyles = makeStyles({
  
    App:{
       
        textAlign: "center"
    },
  header: {
    backgroundColor: "white",
    // backgroundColor: "#add8e6",
    color: "black",
    boxShadow: "1px",
    paddingRight: "42px",
    paddingLeft: "10px",
  },
  image: {
      height:"35px",
    
     
  },
  menuButton: {
    fontFamily:'Playfair Display,serif',
    fontWeight: 600,
    size: "18px",
    marginLeft: "10px",
 },
 toolbar: {
  display: "flex",
  justifyContent: "space-between",
  width:'100%'
},
test:{
  marginLeft:"37.5%"
},
sub_b:{
  marginLeft:"10px",
  backgroundColor:"#e85a4f",
  color:"white"
}


});


const StyledButton = styled(Button)({
  '&:hover': {
      backgroundColor: '#A7423A',
      boxShadow: '20',
    }
})


export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [noti,setNoti] = useState([]);
  const id = localStorage.getItem("id");
  const [n_len,setN_len]= useState(0);
  const classes = useStyles();

  useEffect(()=>{
    getNoti();
},[])


  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNoti = () =>{
    console.log("Inside Noti")
        axios.get(`${process.env.REACT_APP_URL}/customer/home/daily/${id}`)
        .then(res=>{
            console.log("Notifications")
            setNoti(res.data)
            console.log(noti)
            setN_len(res.data.length)
        })
}
  const MarkRead = ()=>{
    console.log("inside mark read")
    axios.post(`${process.env.REACT_APP_URL}/customer/home/daily/${id}`)
    .then(res=>{
        console.log(res)
        setNoti([])
        window.location.reload(true)
    })

}

  const displayDesktop = () => {
    return <Toolbar><img src={img1} className={classes.image}/>
            <div className={classes.test}>{getMenuButtons()}</div>
            <div style={{marginLeft:"22px"}}>
                <StyledButton variant="contained" 
                onClick={()=>navigate('/customer/profile')}
                className={classes.sub_b}>Subscribe</StyledButton>
            </div>
            <div style={{marginLeft:"20px"}}>
              <Badge badgeContent={n_len} color="primary">
                      <NotificationsIcon  color="action"  
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
                  }}>
                  {noti.map(e=>{
                      return ( <MenuItem >{e}</MenuItem>)
                      })
                  }
                  
                  { noti.length ? <MenuItem><Button onClick = {MarkRead}>Mark As Read</Button></MenuItem> : <MenuItem>No new Notifications</MenuItem>}
              </Menu> 
            </div>             
            </Toolbar>;
    
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            // color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <div className="classes.App">
      <AppBar position="sticky" className={classes.header}>
      {displayDesktop()}
      
      </AppBar>
      
    </div>
  );
  
}
