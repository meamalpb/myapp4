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
             users:[]
        }
    }
    

    componentDidMount(){
		db.collection('users').get().then(snapshot => {
			snapshot.docs.forEach(doc => {
                this.setState(prevState => ({
                    users: [...prevState.users, doc.data()]
                  }))
                
			});
		});
    }
    
    hideForm = () =>{
        $('#Login-Page').css("display","none");
        $('#Signup-Page').css("display","none");
        $('#Dark').css("display","none");
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
