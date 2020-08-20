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
             button:null
        }
    }
    
    authListener=()=>{
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({
                    button : 
                    <span>
                        <Button variant="contained" color="primary" disableElevation  className="coloor" component={Link} id='Complaint-Button' onClick={this.showComplaint}>Add Complaint</Button>
                        <Button variant="contained" color="primary" disableElevation  className="coloor" component={Link} id='Signout-Button' onClick={this.handleSignout}>Sign Out</Button>
                    </span>
                })
            }
            else{
                this.setState({
                    button:
                    <span> 
                        <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor" id='Login-Button' onClick = {this.showLogin}>Login</Button>
                        <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor" id='Signup-Button' onClick = {this.showSignup}>Sign Up</Button>
                    </span>
                })
            }
        })
    }
    
    componentDidMount(){
        this.authListener();
    }



    showComplaint = () =>{
        if($('#Complaint-Form').css("display") === 'block') {
            $('#Complaint-Form').fadeOut();
            $('#Dark').fadeOut();
            $('#Home-Button').addClass("clicked");
            $('#Complaint-Button').removeClass("clicked");
        }
        else {
            $('#Complaint-Form').fadeIn();
            $('#Dark').fadeIn();
            $('#Home-Button').removeClass("clicked");
            $('#Complaint-Button').addClass("clicked");
        }
    }


    handleSignout=()=>{
       
        fire.auth().signOut().then(() =>{
            $('#Complaint-Form').css('display','none');
      		$('#Dark').css('display','none');
      		$('#Home-Button').addClass("clicked");
      		$('#Complaint-Button').removeClass("clicked");
        }).catch((err)=>{
            console.log(err);
        })
    }


    showSignup=()=>{
        if($('#Signup-Page').css("display") === 'block') {
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
        if($('#Login-Page').css("display") === 'block') {
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
        $('#Complaint-Form').fadeOut();
        $('#Dark').fadeOut();
        $('#Login-Button').removeClass("clicked");
        $('#Signup-Button').removeClass("clicked");
        $('#Complaint-Button').removeClass("clicked");
        $('#Home-Button').addClass("clicked");
    }


    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <div className="right">
                            <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor clicked" id='Home-Button' onClick = {this.showHome}>home</Button>
                            {this.state.button}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;