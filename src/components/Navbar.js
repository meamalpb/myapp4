import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import '../App.css';
import fire from '../config/fire';
import $ from 'jquery';


class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:null
        }
    }
    componentDidMount(){
        this.authListener()
    }
    
    authListener=()=>{
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({user})
            }
            else{
                this.setState({user:null})
            }
        })
    }
    
    handleSignout=()=>{
       
        fire.auth().signOut().then(() =>{
            console.log("logged out")
        }).catch((err)=>{
            console.log(err)
        })
    }


    showSignup=()=>{
        if($('#Signup-Page').css("display") == 'block') {
            $('#Signup-Page').fadeOut();
            $('#Dark').fadeOut();
            $('#Home-Button').addClass("clicked");
            $('#Signup-Button').removeClass("clicked");
        }
        else {
            $('#Login-Page').fadeOut();
            $('#Signup-Page').fadeIn();
            $('#Dark').fadeIn();
            $('#Home-Button').removeClass("clicked");
            $('#Signup-Button').addClass("clicked");
            $('#Login-Button').removeClass("clicked");
        }
    }


    showLogin=()=>{
        if($('#Login-Page').css("display") == 'block') {
            $('#Login-Page').fadeOut();
            $('#Dark').fadeOut();
            $('#Login-Button').removeClass("clicked");
            $('#Home-Button').addClass("clicked");
        }
        else {
            $('#Signup-Page').fadeOut();
            $('#Login-Page').fadeIn();
            $('#Dark').fadeIn();
            $('#Signup-Button').removeClass("clicked");
            $('#Home-Button').removeClass("clicked");
            $('#Login-Button').addClass("clicked");
        }
    }

    showHome=()=>{
        $('#Login-Page').fadeOut();
        $('#Signup-Page').fadeOut();
        $('#Dark').fadeOut();
        $('#Login-Button').removeClass("clicked");
        $('#Signup-Button').removeClass("clicked")
        $('#Home-Button').addClass("clicked");
    }


    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <div className="right">
                            <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor clicked" id='Home-Button' onClick = {this.showHome}>home</Button>
                            {
                                this.state.user? 
                                    (
                                        <Button variant="contained" color="primary" disableElevation  className="coloor" onClick={this.handleSignout}>sign out</Button>
                                    )   :
                                    (
                                        <span> 
                                            <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor" id='Login-Button' onClick = {this.showLogin}>login</Button>
                                            <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor" id='Signup-Button' onClick = {this.showSignup}>signup</Button>
                                        </span>
                                    )
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;