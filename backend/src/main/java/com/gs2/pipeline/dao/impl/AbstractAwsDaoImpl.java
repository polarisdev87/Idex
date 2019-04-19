package com.gs2.pipeline.dao.impl;

import org.springframework.beans.factory.annotation.Value;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;

public abstract class AbstractAwsDaoImpl {

    private static String API_KEY;

    private static String API_SECRET;
	
    private static AWSCredentials credentials;
    

    private static String REGION_NAME;
    private static Regions REGION;
    
    
    @Value("${pipeline.s3.api.secret}")
    private void setApiSecret(String apiSecret) {
    	API_SECRET = apiSecret;
    }
    
    @Value("${pipeline.s3.api.key}")
    private void setApiKey(String apiKey) {
    	API_KEY = apiKey;
    }
    

// 	Ireland Region
    @Value("${pipeline.s3.bucket.region}")
    private void setRegionName(String regionName) {
    	REGION_NAME = regionName;
    }
    
    public Regions getRegion() {
		if (REGION == null) {
			REGION = Regions.fromName(REGION_NAME);
		}	
    	return REGION;
    }
    
	public AWSCredentials getCredentials() {
		if (REGION == null) {
			REGION = Regions.fromName(REGION_NAME);
	        credentials = new BasicAWSCredentials(
	                API_KEY, 
	                API_SECRET
	              );    		
		}
		return credentials;
	}	
	
	
}
