import React, { Component } from 'react';
import './login.css'
import fire from '../config/fire'
import $ from 'jquery';

const db = fire.firestore()
export class login extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 email:'',
       password:'',
       name:''
		}
  }
  
  //jquery
componentDidMount(){
    $(document).ready(function(){

        $('.input').focus(function(){
          $(this).parent().find(".label-txt").addClass('label-active');
        });
      
        $(".input").focusout(function(){
          if ($(this).val() === '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
          };
        });
      
      });
}

//email,name and password inputs
	handleEmailChange=(e)=>{
		this.setState(
			{email:e.target.value}
		)
	}

	handlePasswordChange=(e)=>{
		this.setState(
			{password:e.target.value}
		)
  }
  handleNameChange=(e)=>{
    this.setState(
      {name:e.target.value}
    )
  }
  //handling Submit

	handleLogin=(e)=>{
    e.preventDefault();
    //adding user to database
    db.collection("users").add({
      name: this.state.name,
      email: this.state.email
  });
		fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u) =>{
			console.log(u)
		}).catch((err)=>{
			console.log(err)
		})
	}
	render() {
		return (
			<div>
				<form>
  <label>
    <p className="label-txt">ENTER YOUR EMAIL</p>
    <input type="text" className="input" value={this.state.email} onChange={this.handleEmailChange}/>
    <div className="line-box">
      <div className="line"></div>
    </div>
  </label>
  <label>
    <p className="label-txt">ENTER YOUR NAME</p>
    <input type="text"className="input" value={this.state.name} onChange={this.handleNameChange}/>
    <div className="line-box">
      <div className="line"></div>
    </div>
  </label>
  <label>
    <p className="label-txt">ENTER YOUR PASSWORD</p>
    <input type="password" className="input" value={this.state.password} onChange={this.handlePasswordChange}/>
    <div className="line-box">
      <div className="line"></div>
    </div>
  </label>
  <button type="submit" onClick={this.handleLogin}>submit</button>
</form>
			
			</div>
		)
	}
}

export default login

