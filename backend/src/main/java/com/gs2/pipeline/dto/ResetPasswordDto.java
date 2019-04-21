package com.gs2.pipeline.dto;

public class ResetPasswordDto {
	
	String username;
	String password;
	String confirmPassword;
	String resetString;
	Boolean confirmed;
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getResetString() {
		return resetString;
	}
	public void setResetString(String resetString) {
		this.resetString = resetString;
	}
	public Boolean getConfirmed() {
		return confirmed;
	}
	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}
	
	
	

}
