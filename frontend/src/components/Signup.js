import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            password1:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                password: this.state.password,
                password1: this.state.password1,
            });
            return response;
        } catch (error) {
             console.log(error.stack);
        }
    }

    render() {
        return (
            <div>
                Signup
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nation:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors && this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label>
                        Access-Code:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors && this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <label>
                        Confirm Access-Code:
                        <input name="password1" type="password" value={this.state.password1} onChange={this.handleChange}/>
                        { this.state.errors && this.state.errors.password1 ? this.state.errors.password1 : null}
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Signup;