import React, { Component } from 'react';

import {horizJuxt} from "./alignment.js";

const adaptLogin = (handler) => (e) => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    handler(username, password);
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        };
        
    }

    render() {
        const {loggedIn, onLogin, onLogout} = this.props;
        
        if (loggedIn) {
            return <button onClick={onLogout}>logout</button>;
        } else {
            return (
                <div>
                  <input id="username" type="text"
                         placeholder="username"
                         style={{width: "95%"}}/><br/>
                  <span style={horizJuxt}>
                    <input id="password" type="password"
                           placeholder="password"/><br/>
                    <button onClick={adaptLogin(onLogin)}>login</button>
                  </span>
                </div>
            );
        }
    }
}

export {
    Login
};
