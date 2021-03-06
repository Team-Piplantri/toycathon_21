import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import axiosInstance from "../axiosApi";
import UserContext from '../UserContext';

class Logout extends Component {
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
            this.props.history.push('/');
        }
        catch (e) {
            console.log(e);
        };
    }

    render() {
        return (
            <div className="logout-form">
                <h1>Sure Want to Logout?</h1>
                <Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button>
            </div>
        );
    }
}

Logout.contextType = UserContext;

export default Logout;