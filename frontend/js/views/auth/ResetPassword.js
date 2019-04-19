/**
 * 
 */

import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { forgotPassword,  forgotPasswordError, resetPassword, resetPasswordError} from '../../actions/auth';



import {
	HelpBlock,
	FormGroup,
	Glyphicon,
	FormControl,
	ControlLabel
} from "react-bootstrap";
import LoaderButton from "../../components/buttons/LoaderButton";
import "../../../assets/css/reset-password.css";
import CommonButton from '../../components/buttons/CommonButton';

export class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
				code: "",
				email: "",
				password: "",
				username: "",
				confirmPassword: "",
		};
	}
	
	  validateEmail(email) {
		    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return emailRegex.test(email);
		  }
	

	validateCodeForm(forgotPasswordData) {
		    let errorMessage = '';

		    if (forgotPasswordData.username.length < 4 || forgotPasswordData.username.length > 50) {
		      errorMessage += 'Username must be 4-50 characters.\n';
		    }

		    let correctEmail= this.validateEmail(forgotPasswordData.email);
		    
		    if (!correctEmail) {
		      errorMessage += 'Not valid email.\n';
		    }

		    if (errorMessage.endsWith('\n')) {
		      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
		    }

		    return errorMessage;
		  }
	
	
	
	validateResetForm(confirmPasswordData) {
	    let errorMessage = '';

	    
	    if (confirmPasswordData.username.length < 4 || confirmPasswordData.username.length > 50) {
		      errorMessage += 'Username must be 4-50 characters.\n';
		    }
	    
	    const correctCode = confirmPasswordData.code.length >0;
	    if (!correctCode) {
		      errorMessage += 'Not valid code.\n';
	    }

	    
	    const correctPassword = confirmPasswordData.password.length >=4 && confirmPasswordData.password.length<=100 ;
	    if (!correctPassword) {
		      errorMessage += 'Not valid password.\n';
	    }

	    const passwordsMatch = confirmPasswordData.password === confirmPasswordData.confirmPassword;
	    if (!passwordsMatch) {
		      errorMessage += "Passwords don't match.\n";
	    }
	    

	    if (errorMessage.endsWith('\n')) {
	      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
	    }

	    return errorMessage;
		
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	
	
	handleSendCodeClick() {
		const { dispatch } = this.props;
		const username = this.loginUsername;
		const email = this.email;
		const forgotPasswordData = { username: username.value.trim(), email: email.value.trim() };
		const errorMessage = this.validateCodeForm(forgotPasswordData);
		if (errorMessage.length > 0) {
		      dispatch(forgotPasswordError(errorMessage));
		      return;
		}
	    dispatch(forgotPassword(forgotPasswordData));
    }
	
	
	handleConfirmClick() {
		const { dispatch } = this.props;
		const code = this.code.value;
		const username = this.loginUsername.value;
		const password = this.password.value;
		const confirmPassword = this.confirmPassword.value;
		
		const confirmPasswordData = {
				username,
	    		password,
	    		code,	
	    		confirmPassword,
		};
		const errorMessages = this.validateResetForm(confirmPasswordData);
		if (errorMessages != "") {
			dispatch(resetPasswordError(errorMessages));
			return ;
		}
	    dispatch(resetPassword(confirmPasswordData));
    }
	

	renderRequestCodeForm(forgotPasswordErrorMessage) {
		return (
 
				<section className="panel">

				<div className="item-container">
	            <input ref={el => { this.loginUsername = el; }} className="auth-input" placeholder="User Name" type="text" />
				</div>

				<div className="item-container">
	            <input ref={el => { this.email = el; }} className="auth-input" placeholder="email" type="email" />
				</div>

		        {!(typeof forgotPasswordErrorMessage == 'undefined' || forgotPasswordErrorMessage=="") &&
		            <div className="item-container alert alert-danger">
	            		{forgotPasswordErrorMessage}
	            	</div>
		        	
		        }  
	            
				

		          <div className="item-container">
		            <CommonButton title="Send Confirmation" className="auth-button" onClick={() => this.handleSendCodeClick()} />
		          </div>
				
				
				</section>
		);
	}




	renderConfirmationForm(errorMessage) {
		return (
				
				<div>
				<section className="panel">

				<div className="item-container">
	            <input ref={el => { this.loginUsername = el; }} className="auth-input" placeholder="User Name" type="text" />
				</div>

				<div className="item-container">
	            <input ref={el => { this.code = el; }} className="auth-input" placeholder="Confirmation Code" type="text" />
				</div>
				<div className="item-container">
				<HelpBlock>
				Please check your email for the confirmation
				code.
				</HelpBlock>
				</div>
        	    <div className="item-container">
        	    	<input ref={el => { this.password = el; }} className="auth-input obfuscate" placeholder="Password" type="text" />
        	    </div>
				
				<div className="item-container">
	                <input ref={el => { this.confirmPassword = el; }}  className="auth-input obfuscate" placeholder="Confirm Password" type="text" />
				</div>
				
				
		        {!(typeof errorMessage == 'undefined' || errorMessage=="") &&
		            <div className="item-container alert alert-danger">
	            		{errorMessage}
	            	</div>
		        	
		        }  
	            
				

		          <div className="item-container">
		            <CommonButton title="Send Confirmation" className="auth-button" onClick={() => this.handleConfirmClick()} />
		          </div>
				
				
				</section>
				</div>
		);
	}

	renderSuccessMessage() {
		return (
				<div className="success">
				<Glyphicon glyph="ok" />
					<p>Your password has been reset.</p>
					<p>
					<Link to="/auth">
					Click here to login with your new credentials.
					</Link>
					</p>
					</div>
		);
	}

	render() {
		
		const {errorMessage} = this.props;
		
		
		return (
				<div className="ResetPassword">
				{!this.props.codeSent
					? this.renderRequestCodeForm(errorMessage)
					: !this.props.confirmed
							? this.renderConfirmationForm(errorMessage)
							: this.renderSuccessMessage()}
				</div>
		);
	}
}



function mapStateToProps(state) {
	return {
		codeSent: state.auth.resetPassword.codeSent,
		confirmed: state.auth.resetPassword.confirmed,
		isConfirming: state.auth.resetPassword.isConfirming,
		isSendingCode: state.auth.resetPassword.isSendingCode,
		errorMessage: state.auth.resetPassword.errorMessage,
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
