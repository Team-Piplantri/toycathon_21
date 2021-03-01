import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import axiosInstance from "./axiosApi";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Hello from "./components/Hello";

class App extends Component {
  constructor() {
    super();
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
      return response;
    }
    catch (e) {
      console.log(e);
    };
  }

  render() {
    return (
      <div className="site">
        <nav>
          <Link className={"nav-link"} to={"/"}>Home</Link>
          {localStorage.getItem('access_token') == null ?
            <div>
              <Link className={"nav-link"} to={"/login/"}>Login</Link>
              <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
            </div>:
            <div>
              <button onClick={this.handleLogout}>Logout</button>
              <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
            </div>
          }
        </nav>

        <main>
          <h1>Its Toycathon'21...</h1>
          <Switch>
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/signup/"} component={Signup} />
            <Route exact path={"/hello/"} component={Hello} />
            <Route path={"/"} render={() => <div>Home again</div>} />
          </Switch>
        </main>

      </div>
    );
  }
}

export default App;