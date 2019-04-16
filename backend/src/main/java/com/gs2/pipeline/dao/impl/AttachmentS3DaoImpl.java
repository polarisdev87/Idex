package com.gs2.pipeline.dao.impl;

import java.io.InputStream;
import java.util.Set;

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
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.gs2.pipeline.dao.AttachmentDao;
import com.gs2.pipeline.domain.IdeaFile;
import com.gs2.pipeline.dto.UploadDto;

@Repository
public class AttachmentS3DaoImpl implements AttachmentDao {

    private static String API_KEY;

    private static String API_SECRET;
	
	
    private static AWSCredentials credentials;
    

    private static String REGION_NAME;
    private static Regions REGION;
    
    
    private static String BUCKET_NAME;
    
    private static AmazonS3 s3client;
    
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
    
    
    private String getFullDestination(Long fileId, String originalFileName) {
        String fileFolder = Long.toString(fileId);
        String keyName = fileFolder+"/"+originalFileName;
        return keyName;
        
    }
    
    private AmazonS3 getS3Client() {
    	if (s3client == null ) {
        	if (REGION == null) {
        		REGION = Regions.fromName(REGION_NAME);
                credentials = new BasicAWSCredentials(
                        API_KEY, 
                        API_SECRET
                      );    		
        	}
            s3client = AmazonS3ClientBuilder.standard().withRegion(REGION).withCredentials(new AWSStaticCredentialsProvider(credentials)).build();
    	}
        return s3client;
    }
    
    
    public UploadDto upload(Long ideaId, Long fileId, String originalFileName, InputStream inputStream, String contentType, Long size ) {
    	
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);
        metadata.setContentLength(size);

        String keyName = getFullDestination(fileId,originalFileName);
        
//         Upload upload = tm.upload(BUCKET_NAME, keyName, inputStream, metadata);
        
//         BasicAWSCredentials creds = new BasicAWSCredentials(API_KEY, API_SECRET);
        PutObjectResult objectResult = getS3Client().putObject(BUCKET_NAME, keyName, inputStream, metadata);
        return new UploadDto(objectResult.getContentMd5(),"S3:"+BUCKET_NAME+":"+keyName);
    }

	@Override
	public Boolean remove(Long ideaId, Long fileId, String originalFileName) {
        String keyName = getFullDestination(fileId,originalFileName);
		getS3Client().deleteObject(BUCKET_NAME, keyName);
		return true;
	}

	@Override
	public void remove(Set<IdeaFile> ideaFilesToDelete) {
		for (IdeaFile ideaFile:ideaFilesToDelete) {
			getS3Client().deleteObject(
					BUCKET_NAME,
					getFullDestination(ideaFile.getFile().getId(),ideaFile.getFile().getOriginalName()));
		}
	}

	@Override
	public InputStream getImageFile(Long ideaId, Long fileId, String originalFileName) {
        String keyName = getFullDestination(fileId,originalFileName);
        
        S3Object s3object = getS3Client().getObject(BUCKET_NAME, keyName);
        InputStream inputStream = s3object.getObjectContent();        
        
        return inputStream;
	}
    
	@Override
	public InputStream download(Long ideaId, Long fileId, String originalFileName) {
        String keyName = getFullDestination(fileId,originalFileName);
        
        S3Object s3object = getS3Client().getObject(BUCKET_NAME, keyName);
        InputStream inputStream = s3object.getObjectContent();        
        
        return inputStream;
	}
    
}
