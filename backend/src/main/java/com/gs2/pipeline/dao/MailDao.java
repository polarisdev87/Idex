package com.gs2.pipeline.dao;

public interface MailDao {
	
	public String sendMail(String from, String to, String subject, String htmlBody, String textBody);

}
