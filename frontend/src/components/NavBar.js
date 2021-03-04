// import React, { Component } from "react";
// import axiosInstance from "../axiosApi";
// import {Link} from 'react-router-dom';

// import UserContext from '../UserContext';   

// class NavBar extends Component {    
//     constructor(props) {
//         super(props);
//         this.handleLogout = this.handleLogout.bind(this);
//     }

//     async handleLogout() {
//         try {
//           const response = await axiosInstance.post('/blacklist/', {
//             "refresh_token": localStorage.getItem("refresh_token")
//           });
//           localStorage.removeItem('access_token');
//           localStorage.removeItem('refresh_token');
//           axiosInstance.defaults.headers['Authorization'] = null;
//           this.context.setValue(false);
//         }
//         catch (e) {
//           console.log(e);
//         };
        
//       }

//     render() {
//         if (this.context.value) {
//             return (
//                 <div>
//                     <Link className={"nav-link"} to={"/"}>Home</Link>
//                     <button onClick={this.handleLogout}>Logout</button>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 <div>
//                     <Link className={"nav-link"} to={"/"}>Home</Link>
//                     <Link className={"nav-link"} to={"/login/"}>Login</Link>
//                     <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
//                 </div>
//             );
//         }
//     }
// }

// NavBar.contextType = UserContext;

// export default NavBar;

import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import HomeIcon from '@material-ui/icons/Home';
  import VpnKeyIcon from '@material-ui/icons/VpnKey';
  import CreateIcon from '@material-ui/icons/Create';
  
  const headersData = [
    {
      label: "Home",
      href: "#",
      tag:<HomeIcon />,
    },
    {
      label: "Login",
      href: "/login",
      tag:<VpnKeyIcon />,
    },
    {
      label: "Sign Up",
      href: "/signup",
      tag:<CreateIcon />,
    },
    // {
    //   label: "Log Out",
    //   href: "/logout",
    // },
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#03A7CC",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
  }));
  
  export default function Header() {
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          {ArthshastraLogo}
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
  
          <div>{ArthshastraLogo}</div>
        </Toolbar>
      );
    };
  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href ,tag}) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{tag} <span style={{paddingLeft:"5px"}}>{label}</span></MenuItem>
          </Link>
        );
      });
    };
  
    const ArthshastraLogo = (
      <Typography variant="h6" component="h1" className={logo}>
        Arthshastra
      </Typography>
    );
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href ,tag}) => {
        return (
          // <Button>
          //   <HomeIcon />
          // </Button>
          <IconButton
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label} <span style={{paddingLeft:"5px"}}>{tag}</span> 
          </IconButton>
        );
      });
    };
  
    return (
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  }