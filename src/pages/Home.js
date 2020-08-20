import React, { Component } from 'react'
import fire from '../config/fire'
import Login from './Login';
import Signup from './Signup';
import '../styles/home.css';
import Dark from '../black.jpg';
import $ from 'jquery';


const db=fire.firestore();

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
             complains:[],
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
        db.collection('Complaints').get().then(snapshot => {
            let temp = [];
			snapshot.docs.forEach(doc => {
                temp.push(doc.data());
            });
            this.setState({
                complains:temp
            })
        });
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


    hideForm = () =>{
        $('#Login-Page').fadeOut();
        $('#Signup-Page').fadeOut();
        $('#Dark').fadeOut();
        $('#Home-Button').addClass("clicked");
        $('#Signup-Button').removeClass("clicked");
        $('#Login-Button').removeClass("clicked");
    }


    render() {
        return (
            <div>
                <div id='Heading'>
                    <h1>home</h1>
                    { this.state.users.map((user,index)=> <h2 key={index}>{user.email}</h2> ) }  
                    { this.state.complains.map((user,index)=> <li key={index}>{user.District}</li> ) }                 
                </div>
                
                <div id='Dark' onClick = {this.hideForm}>
                    <img src={Dark} alt=""></img>
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
