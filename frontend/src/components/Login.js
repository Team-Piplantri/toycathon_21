import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import { Redirect } from 'react-router-dom';

import UserContext from '../UserContext';

import {TextField, Paper, Grid, Button } from "@material-ui/core"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.isSubmitting = this.isSubmitting.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('access_token')) {
            this.setState({ isLogin: true });
        }
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleReset() {
        this.setState({ username: "", password: "" })
    }

    isSubmitting() {
        if (this.state.username == "" || this.state.password == "") {
            return true;
        }
        return false;
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
        if (this.context.value) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <p style={{ textAlign: "center" }}> Login Form </p>
                <form onSubmit={this.handleSubmit}>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="center" justify="center" spacing={2}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    required
                                    name="username"
                                    variant="filled"
                                    type="text"
                                    label="Country Name"
                                    helperText="India,Der Komigin"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="filled"
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 16 }, { marginLeft: 16 }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={this.handleReset}
                                    disabled={this.isSubmitting()}
                                >Reset</Button>
                            </Grid>

                            <Grid item style={{ marginTop: 16 }, { marginLeft: 16 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={this.isSubmitting()}
                                >Submit</Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </form>
            </div>
        )
    }
}

Login.contextType = UserContext;

export default Login;
