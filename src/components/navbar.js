
import React, { Component } from 'react'

import Link from 'react-router-dom/Link'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import '../App.css';
import fire from '../config/fire'


export class navbar extends Component {
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

    render() {
        return (
            <div>
                
            <AppBar position="fixed">
                <Toolbar>
                <div className="right">
                <Button variant="contained" color="primary" disableElevation component={Link} to='/' className="coloor">home</Button>

                {this.state.user? (<Button variant="contained" color="primary" disableElevation  className="coloor" onClick={this.handleSignout}>sign out</Button>):(<span><Button variant="contained" color="primary" disableElevation component={Link} to='/login' className="coloor">login</Button>
                <Button variant="contained" color="primary" disableElevation component={Link} to='/signup' className="coloor">signup</Button></span>)}
 
                </div>
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

export default navbar
