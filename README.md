# Falcon serverless apis

> using Serverless framework, MiddyJS, DynamoDB, AWS lambda, AWS API Gateway

# Setup

- git clone this repo
- npm ci
- [openapi docs](docs/openapi.json)
- [postman collection](docs/postman.json)
- local testing `npm run dev`
- generate openapi and postman file `npm run gen-openapi`
- deploy `npm run deploy -- --aws-profile REPLACE_ME`
  - will create all resources like DynamoDB table, IAM roles, S3 bucket for deployment etc
- to remove everything `npx sls remove --aws-profile REPLACE_ME`
- to import users data to DDB `npm run data-import`
  - you can pass env vars for `DDB_PROFILE, DDB_REGION` script will take care of rest
