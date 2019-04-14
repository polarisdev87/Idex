package com.gs2.pipeline.dao.impl;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.gs2.pipeline.dao.AttachmentDao;

@Repository
public class AttachmentS3DaoImpl implements AttachmentDao {

    private static String API_KEY;

    private static String API_SECRET;
	
	
    private static AWSCredentials credentials;
    

    private static String REGION_NAME;
    private static Regions REGION;
    
    
    private static String BUCKET_NAME;
    
/*
    AmazonS3 s3client = AmazonS3ClientBuilder
  		  .standard()
  		  .withCredentials(new AWSStaticCredentialsProvider(credentials))
  		  .withRegion(REGION)
  		  .build();   
  */  
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
    
    @Value("${pipeline.s3.bucket.name}")
    private void setBucketName(String bucketName) {
    	BUCKET_NAME = bucketName;
    }
    
    
    AmazonS3 amazonS3 = AmazonS3ClientBuilder
    		  .standard()
    		  .withCredentials(new DefaultAWSCredentialsProviderChain())
    		  .withRegion(Regions.DEFAULT_REGION)
    		  .build();    

    
    TransferManager tm = TransferManagerBuilder.standard()
    		  .withS3Client(amazonS3)
    		  .withMultipartUploadThreshold((long) (5 * 1024 * 1025))
    		  .build();
    
    
    public String upload(Long ideaId, Long fileId, String originalFileName, InputStream inputStream, String contentType, Long size ) {
    	if (REGION == null) {
    		REGION = Regions.fromName(REGION_NAME);
            credentials = new BasicAWSCredentials(
                    API_KEY, 
                    API_SECRET
                  );    		
    	}
    	
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);
        metadata.setContentLength(size);

        String ideaFolder = Long.toString(ideaId);
        String fileFolder = Long.toString(fileId);
        String keyName = ideaFolder+"/"+fileFolder+"/"+originalFileName;
        
//         Upload upload = tm.upload(BUCKET_NAME, keyName, inputStream, metadata);
        
//         BasicAWSCredentials creds = new BasicAWSCredentials(API_KEY, API_SECRET);
        AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion(REGION).withCredentials(new AWSStaticCredentialsProvider(credentials)).build();
        PutObjectResult objectResult = s3client.putObject(BUCKET_NAME, keyName, inputStream, metadata);
        return objectResult.getContentMd5();
    }
    
    
}
