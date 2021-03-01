import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

import UserContext from "./UserContext";

function requireAuth(nextState, replaceState) {
  if (localStorage.getItem('access_token') == null) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.setState({ isLogin: true });
    }
  }

  setValue(newValue) {
    this.setState({ isLogin: newValue });
  }


  render() {
    return (

        <div className="site">
          <UserContext.Provider value={{value:this.state.isLogin,setValue:this.setValue}}>

          <NavBar />

          <main>
            <h1>Its Toycathon'21...</h1>
            <Switch>
              <Route exact path={"/login/"} component={Login} />
              <Route exact path={"/signup/"} component={Signup} />
              <Route path={"/"} onEnter={requireAuth} component={Home} />
            </Switch>
          </main>

          </UserContext.Provider>

        </div>
    );
  }
}

export default App;