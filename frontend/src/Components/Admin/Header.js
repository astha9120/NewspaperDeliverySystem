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
    label: "Support",
    href: "/admin/support",
  },
  
  {
    label: "Ndb List",
    href: "/admin/ndblist",
  },
  {
    label: "Vendor List",
    href: "/admin/vendorlist",
  },
  {
    label: "LogOut",
    href: "/admin",
  },
];

const useStyles = makeStyles({
  
    App:{
       
        textAlign: "center"
    },
  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "1px",
    paddingRight: "42px",
    paddingLeft: "10px",
  },
  image: {
      height:"35px",
    
     
  },
  menuButton: {
    fontFamily: "Lato, sans-serif",
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
  marginLeft:"55%"
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
