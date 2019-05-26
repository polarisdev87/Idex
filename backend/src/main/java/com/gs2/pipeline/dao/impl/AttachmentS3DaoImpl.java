package com.gs2.pipeline.dao.impl;

import java.io.InputStream;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.gs2.pipeline.dao.AttachmentDao;
import com.gs2.pipeline.domain.IdeaFile;
import com.gs2.pipeline.dto.UploadDto;

@Repository
public class AttachmentS3DaoImpl extends AbstractAwsDaoImpl implements AttachmentDao {

    private static String BUCKET_NAME;
    
    /**
     * aLL attachments will be inside this folder
     * This allows many users in dev mode interact with the application with their own baseFolder
     * Each developer can configure S3_BASE_FOLDER to a unique folder
     */
    private static String S3_BASE_FOLDER;
    
    private static AmazonS3 s3client;

    @Value("${pipeline.s3.bucket.name}")
    private void setBucketName(String bucketName) {
    	BUCKET_NAME = bucketName;
    }
    
    @Value("${pipeline.s3.bucket.base-folder}")
    private void setBaseFolder(String baseFolder) {
    	S3_BASE_FOLDER = baseFolder;
    }


    private String getFullDestination(Long fileId, String originalFileName) {
    	String baseFolder = S3_BASE_FOLDER;
    	if (baseFolder==null) {
    		baseFolder="";
    	} else {
    		baseFolder += "/";
    	}
        String fileFolder = Long.toString(fileId);

    	return baseFolder+fileFolder+"/"+originalFileName;
    }
    
    private AmazonS3 getS3Client() {
    	if (s3client == null ) {
    		AWSCredentials myCredentials = getCredentials();
            s3client = AmazonS3ClientBuilder.standard().withRegion(getRegion())
            		.withCredentials(new AWSStaticCredentialsProvider(myCredentials)).build();
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
	public InputStream getAttachmentFile( Long fileId, String originalFileName) {
        String keyName = getFullDestination(fileId,originalFileName);
        
        S3Object s3object = getS3Client().getObject(BUCKET_NAME, keyName);

        return s3object.getObjectContent();
	}
    
	@Override
	public InputStream download(Long fileId, String originalFileName) {
        String keyName = getFullDestination(fileId,originalFileName);
        
        S3Object s3object = getS3Client().getObject(BUCKET_NAME, keyName);

        return s3object.getObjectContent();
	}
    
}
