import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import {Link} from 'react-router-dom';

import UserContext from '../UserContext';   

class NavBar extends Component {    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
          const response = await axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
          });
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          axiosInstance.defaults.headers['Authorization'] = null;
          this.context.setValue(false);
        //   this.props.history.push('/');          
        }
        catch (e) {
          console.log(e);
        };
        
      }

    render() {
        if (this.context.value) {
            return (
                <div>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                </div>
            );
        }
    }
}

NavBar.contextType = UserContext;

export default NavBar;