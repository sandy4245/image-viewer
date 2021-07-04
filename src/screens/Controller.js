import React, { Component } from 'react';
import Home from '../screens/home/Home';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../screens/login/Login';



class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "https://graph.instagram.com/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
           <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl}/>} />
           <Route path='/?access_token=ACCESS-TOKEN' render={(props) => <Home {...props} baseUrl={this.baseUrl} />}/>

          
        </div>
      </Router>
    )
  }
}

export default Controller;