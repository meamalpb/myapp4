import React, { Component } from 'react'
import fire from '../config/fire'
import Login from './Login';
import Signup from './Signup';
import '../styles/home.css';
import Dark from '../black.jpg';
import $ from 'jquery';
import Card from './Card';
import ComplaintForm from './ComplaintForm';

const db=fire.firestore();

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
             user:null
        }
    }
    

    componentDidMount(){
		db.collection('users').onSnapshot(snapshot => {
            let temp=[];
            snapshot.docs.forEach(doc => {
                temp.push(doc.data());
            });
            this.setState({
                users:temp
              })
        });
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


    hideForm = () =>{
        $('#Login-Page').fadeOut();
        $('#Signup-Page').fadeOut();
        $('#Complaint-Form').fadeOut();
        $('#Dark').fadeOut();
        $('#Home-Button').addClass("clicked");
        $('#Signup-Button').removeClass("clicked");
        $('#Login-Button').removeClass("clicked");
        $('#Complaint-Button').removeClass("clicked");
    }


    render() {
        return (
            <div>
                <div id='Heading'>      
                    <div>
                        <Card />
                    </div>            
                </div>
                
                <div id='Dark' onClick = {this.hideForm}>
                    <img src={Dark} alt=""></img>
                </div>
                <div id='Complaint-Form'>
                     <ComplaintForm />
                </div>
                <div id='Login-Page'>
                    <Login />
                </div>
                <div id='Signup-Page'>
                    <Signup />    
                </div>
               
                
            </div>
        )
    }
}

export default Home;
