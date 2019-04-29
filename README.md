# Pipeline

## Running the Backend
1. Install Maven
2. Install Java
3. Install Postgres
4. Run PostgreSQL
5. Create a Postgres database to hold the data, such as pipeline_test
6. Navigate to the backend directory in your terminal
7. Define the base folder for S3 bucket. All attachments will be saved inside that folder - This configuration allows each developer have their own environment
8. Define the mail from value corresponding to a validated mail in AWS SES 
9. Run `mvn spring-boot:run -DPIPELINE_DB=pipeline_test -DPIPELINE_DB_USER=postgres -DPIPELINE_DB_PASS=postgres` -DS3_BUCKET_NAME=pipeline-2-dev -DS3_API_KEY=<s3 api key value> -DS3_API_SECRET=<api secret value> -DS3_REGION=eu-west-1 -DS3_BASE_FOLDER=<base folder selected for your session> -DMAIL_FROM=<mail from when sending mails>


10. The backend is now running at `localhost:8080`

## Running the Frontend
1. Navigate to the frontend directory in your terminal
2. `npm install`  (node version => 7.8.0 )
3. `npm start`
4. In your browser got to `localhost:4000`

## test users
The users and passwords are initially

admin: admin
manager: admin
user: password


