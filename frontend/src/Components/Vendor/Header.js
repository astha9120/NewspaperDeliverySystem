import  img1 from './newsDaily.png'

import {
  AppBar,
  Toolbar,  
  IconButton,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";



const headersData = [
  {
    label: "profile",
    href: "/vendor/profile",
  },
  {
    label: "PickUp list",
    href: "/vendor/ndblist",
  },
  {
    label: "Quantity List",
    href: "/vendor/quantity",
  },
  {
    label: "Add newspaper",
    href: "/vendor/addnews",
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
    paddingLeft: "32px",
  },
  image: {
      height:"35px",
    
     
  },
  menuButton: {
    fontFamily:'Playfair Display,serif',
    fontWeight: 600,
    size: "18px",
    marginLeft: "40px",
 },
 toolbar: {
  display: "flex",
  justifyContent: "space-between",
  width:'100%'
},
test:{
  marginLeft:"35%"
}


});



export default function Header() {
  const classes = useStyles();
  const displayDesktop = () => {
    return <Toolbar><img src={img1} className={classes.image}/>
            <div className={classes.test}>{getMenuButtons()}</div>
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
