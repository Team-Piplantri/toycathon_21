import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import {Redirect} from 'react-router-dom';

import UserContext from '../UserContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: ""};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('access_token')){
            this.setState({isLogin:true});
        }
    }
  
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            
            this.context.setValue(true);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    render() {
        if(this.context.value){
            return <Redirect to='/'/>;
        }
        return (
            <div>Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nation:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Access-Code:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

Login.contextType = UserContext;

export default Login;
