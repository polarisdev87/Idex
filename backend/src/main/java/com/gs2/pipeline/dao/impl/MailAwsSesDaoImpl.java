package com.gs2.pipeline.dao.impl;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import com.amazonaws.services.simpleemail.model.SendEmailResult;
import com.gs2.pipeline.dao.MailDao;

public class MailAwsSesDaoImpl extends AbstractAwsDaoImpl implements MailDao{

	  // The configuration set to use for this email. If you do not want to use a
	  // configuration set, comment the following variable and the 
	  // .withConfigurationSetName(CONFIGSET); argument below.
	  static final String CONFIGSET = "ConfigSet";

	  /**


	  // The subject line for the email.

	  // The HTML body for the email.
	  static final String HTMLBODY = "<h1>Amazon SES test (AWS SDK for Java)</h1>"
	      + "<p>This email was sent with <a href='https://aws.amazon.com/ses/'>"
	      + "Amazon SES</a> using the <a href='https://aws.amazon.com/sdk-for-java/'>" 
	      + "AWS SDK for Java</a>";
	   * 
	   * 
	  // your "From" address.
	  // This address must be verified with Amazon SES.
	   * 
	   * 
	  // "To" address. If your account
	  // is still in the sandbox, this address must be verified.
	   * 
	   * 
	  // The email body for recipients with non-HTML email clients.
	  static final String TEXTBODY = "This email was sent through Amazon SES "
	      + "using the AWS SDK for Java.";

	   * 
	   * 
	   * 
	   */
	  public String sendMail(String from, String to, String subject, String htmlBody, String textBody) {
		  String result ="";
		    try {
			      AmazonSimpleEmailService client = 
			          AmazonSimpleEmailServiceClientBuilder.standard()
			            .withRegion(getRegion())
			            .withCredentials(new AWSStaticCredentialsProvider(getCredentials()))
			            .build();
			      SendEmailRequest request = new SendEmailRequest()
			          .withDestination(
			              new Destination().withToAddresses(to))
			          .withMessage(new Message()
			              .withBody(new Body()
			                  .withHtml(new Content()
			                      .withCharset("UTF-8").withData(htmlBody))
			                  .withText(new Content()
			                      .withCharset("UTF-8").withData(textBody)))
			              .withSubject(new Content()
			                  .withCharset("UTF-8").withData(subject)))
			          .withSource(from);
			          // Comment or remove the next line if you are not using a
			          // configuration set
			          // .withConfigurationSetName(CONFIGSET);
			      SendEmailResult resultEmail = client.sendEmail(request);
			      result = resultEmail.getMessageId();
			      
			      System.out.println("Email sent!");
			    } catch (Exception ex) {
			      System.out.println("The email was not sent. Error message: " 
			          + ex.getMessage());
			    }
		    return result;
	  }
	}	
	

