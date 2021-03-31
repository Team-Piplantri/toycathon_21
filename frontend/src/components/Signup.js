import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import {Redirect} from 'react-router-dom';

import { Radio, TextField, Paper,Grid, Button, RadioGroup, FormLabel,Typography, FormControl, FormControlLabel } from "@material-ui/core"
import UserContext from '../UserContext';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            password1: "",
            currency: "",
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.isSubmitting = this.isSubmitting.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('access_token')){
            this.setState({isLogin:true});
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleReset() {
        this.setState({ username: "", password: "",password1: "", currency: ""})
    }

    isSubmitting() {
        if (
            this.state.username == "" || 
            this.state.password == "" || 
            this.state.password1 == "" ||
            this.state.currency == "" ||
            this.state.q1 == "" ||
            this.state.q2 == "" ||
            this.state.q3 == "" ||
            this.state.q4 == "" ||
            this.state.q5 == "" 
        ) {
            return true;
        }
        return false;
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                password: this.state.password,
                password1: this.state.password1,
                currency: this.state.currency,
                q1: this.state.q1,
                q2: this.state.q2,
                q3: this.state.q3,
                q4: this.state.q4,
                q5: this.state.q5,
            });
            this.props.history.push('/login');
        } catch (error) {
             console.log(error.stack);
        }
    }

    render() {
        if(this.context.value){
            return <Redirect to='/'/>;
        }
        return (
            <div>
            <p style={{textAlign:"center"}}>SignUp Form</p>
            <form onSubmit={this.handleSubmit}>
                <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="center" justify="center" spacing={2} style={{ minHeight: "100vh" }}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                required
                                name="username"
                                variant="filled"
                                type="text"
                                label="Nation Name"
                                helperText="India,Der Komigin"
                                value={this.state.username} 
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                required
                                name="currency"
                                variant="filled"
                                type="text"
                                label="Currency Name"
                                value={this.state.currency} 
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                required
                                name="password"
                                variant="filled"
                                type="password"
                                label="Access-Code:"
                                value={this.state.password} 
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                required
                                name="password1"
                                variant="filled"
                                type="password"
                                label="Confirm Access-Code:"
                                value={this.state.password1} 
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Question 1</FormLabel>
                                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare viverra suscipit. Cras eu eros faucibus, volutpat elit at, faucibus quam.</Typography>
                                <RadioGroup name="q1" row onChange={this.handleChange}>
                                    <FormControlLabel
                                        label="Agree Strongly"
                                        value="4"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Agree"
                                        value="3"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree Strongly"
                                        value="2"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree"
                                        value="1"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Question 2</FormLabel>
                                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare viverra suscipit. Cras eu eros faucibus, volutpat elit at, faucibus quam.</Typography>
                                <RadioGroup name="q2" row onChange={this.handleChange}>
                                    <FormControlLabel
                                        label="Agree Strongly"
                                        value="4"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Agree"
                                        value="3"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree Strongly"
                                        value="2"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree"
                                        value="1"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Question 3</FormLabel>
                                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare viverra suscipit. Cras eu eros faucibus, volutpat elit at, faucibus quam.</Typography>
                                <RadioGroup name="q3" row onChange={this.handleChange}> 
                                    <FormControlLabel
                                        label="Agree Strongly"
                                        value="4"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Agree"
                                        value="3"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree Strongly"
                                        value="2"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree"
                                        value="1"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Question 4</FormLabel>
                                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare viverra suscipit. Cras eu eros faucibus, volutpat elit at, faucibus quam.</Typography>
                                <RadioGroup name="q4" row onChange={this.handleChange}>
                                    <FormControlLabel
                                        label="Agree Strongly"
                                        value="4"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Agree"
                                        value="3"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree Strongly"
                                        value="2"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree"
                                        value="1"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Question 5</FormLabel>
                                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare viverra suscipit. Cras eu eros faucibus, volutpat elit at, faucibus quam.</Typography>
                                <RadioGroup name="q5" row onChange={this.handleChange}>
                                    <FormControlLabel
                                        label="Agree Strongly"
                                        value="4"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Agree"
                                        value="3"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree Strongly"
                                        value="2"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label="Disagree"
                                        value="1"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 16 }, { marginLeft: 16 }}>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={this.handleReset}
                                disabled={this.isSubmitting()}
                            >
                                Reset
                            </Button>
                        </Grid>

                        <Grid item style={{ marginTop: 16 }, { marginLeft: 16 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={this.isSubmitting()}
                            >
                                Create New Nation :)
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>

        </div>
        );
    }
}

Signup.contextType = UserContext;

export default Signup;