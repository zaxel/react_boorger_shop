import React from "react";
import Login from "./Login";
import firebase from "firebase/app";
import { firebaseApp } from "../../base";

class SighIn extends React.Component{
    state = {
        user: ''
    }

    render(){
        if(!this.state.user) return <Login/>;
        return this.props.children;
    }
}

export default SighIn;