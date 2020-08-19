import React, { Component } from 'react';
import '../styles/login.css';
import fire from '../config/fire';
import $ from 'jquery';


class Login extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			email:'',
			password:''
	   }
	}

	
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


	handleLogin=(e)=>{
		e.preventDefault();
		fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u) =>{
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
						<p className="label-txt">ENTER YOUR PASSWORD</p>
						<input type="password" className="input" value={this.state.password} onChange={this.handlePasswordChange}/>
						<div className="line-box">
							<div className="line"></div>
						</div>
					</label>
					<button type="submit" onClick={this.handleLogin}>submit</button>
				</form>
				<h1>{this.state.users}</h1>
			</div>
		)
	}
}

export default Login;
